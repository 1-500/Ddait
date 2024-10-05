import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Carousel from 'react-native-reanimated-carousel';
import uuid from 'react-native-uuid';

import { createFoodRecordByTime, getFoodRecordByTime, postUserFoodRecordImage } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { supabase } from '../../../lib/supabaseClient';
import useDiaryCalendarStore from '../../../store/food/calendar/index';
import useSelectedFoodsStore from '../../../store/food/selectedFoods/index';
import useSelectedFoodTimeStore from '../../../store/index';
import { calculateNutrientRatios, getTotal } from '../../../utils/foodDiary/index';

const PlusButtonIcon = require('../../../assets/images/dietDiary/PluscircleButton.png');
const MinusButtonIcon = require('../../../assets/images/dietDiary/MinusCircleButton.png');

const width = Dimensions.get('window').width;

const FoodRecordDetail = () => {
  const navigation = useNavigation();

  const { foodList, setFoodList } = useSelectedFoodsStore();
  const { time } = useSelectedFoodTimeStore();
  const { selected } = useDiaryCalendarStore();

  const [images, setImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchFoodRecord = async () => {
      try {
        const result = await getFoodRecordByTime({
          date: selected,
          mealTime: time,
        });
        if (result.error) {
          throw new Error(result.error);
        }
        setFoodList(result.data);
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    fetchFoodRecord();
  }, [selected, time, setFoodList]);

  const macroRatio = useMemo(() => {
    return calculateNutrientRatios(foodList);
  }, [foodList]);

  const handleDeleteFood = async (id) => {
    const updatedList = foodList.filter((item) => item.id !== id);
    setFoodList(updatedList);
  };

  const handleConfirmButton = async () => {
    try {
      if (!foodList.length) {
        throw new Error('등록된 음식이 존재하지 않습니다!');
      }
      const response = await createFoodRecordByTime({
        foodItems: foodList,
        meal_time: time,
        date: selected,
      });
      let food_record_id;

      if (response.status === 200) {
        food_record_id = response.food_record_id;
        Alert.alert(response.message);
      } else {
        throw new Error('음식을 기록하는데 실패하였습니다.');
      }
      if (images.length > 0) {
        const uploadPromises = images.map((uri) => uploadImage(uri, food_record_id));
        const results = await Promise.all(uploadPromises);
        const errorMessages = results.filter((message) => !message.includes('성공')); // 성공 메시지가 아닌 경우 필터링
        if (errorMessages.length > 0) {
          Alert.alert(errorMessages[0]);
          return;
        }
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const selectImages = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (response.didCancel) {
        // console.log('사용자가 선택을 취소했습니다.');
      } else if (response.error) {
        // console.log('이미지 선택 중 오류 발생:', response.error);
      } else {
        const selectedImages = response.assets.map((asset) => asset.uri);
        setImages(selectedImages);
      }
    });
  };
  const deleteImage = (index) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      if (newImages.length > 0) {
        if (index >= newImages.length) {
          setActiveImageIndex(newImages.length - 1);
          carouselRef.current?.scrollTo({ index: newImages.length - 1, animated: true });
        } else {
          setActiveImageIndex(Math.min(index, newImages.length - 1));
          carouselRef.current?.scrollTo({ index: Math.min(index, newImages.length - 1), animated: true });
        }
      } else {
        setActiveImageIndex(0);
      }

      return newImages;
    });
  };

  const uploadImage = async (uri, food_record_id) => {
    if (food_record_id === undefined) {
      return '등록된 음식이 존재하지 않습니다!';
    }
    const imageName = uuid.v4(); // 고유한 이미지 이름 생성
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const filePath = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const file = {
      uri: filePath,
      type: `image/${fileType}`,
      name: `${imageName}.${fileType}`,
    };

    try {
      const { data, error } = await supabase.storage.from('food_record_images').upload(`images/${imageName}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }
      const file_url = data.path;
      const response = await postUserFoodRecordImage({
        file_url,
        food_record_id: food_record_id,
      });
      if (response.status !== 200) {
        throw new Error('이미지 업로드에 실패하였습니다.');
      }

      return '이미지 업로드 성공';
    } catch (error) {
      Alert.alert(error.message);
      return error.message;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents title={time} />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.header}>
          {images.length > 0 ? (
            <View style={styles.carouselContainer}>
              <Carousel
                ref={carouselRef}
                loop={false}
                width={width}
                height={width}
                data={images}
                onSnapToItem={setActiveImageIndex}
                renderItem={({ item, index }) => (
                  <View style={styles.carouselItem}>
                    <Image source={{ uri: item }} style={styles.carouselImage} resizeMode="cover" />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteImage(index)}>
                      <Text style={styles.deleteButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.imageCounter}>
                      {index + 1}/{images.length}
                    </Text>
                  </View>
                )}
              />
            </View>
          ) : (
            <View style={styles.addPhotoContainer}>
              <TouchableOpacity activeOpacity={0.6} onPress={selectImages}>
                <Image source={PlusButtonIcon} style={styles.addButton} />
              </TouchableOpacity>
              <Text style={styles.addPhoto}>사진을 업로드하세요.</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.calorieContainer}>
            <Text style={styles.calorieText}>총 열량</Text>
            <Text style={styles.calorieText}>{getTotal(foodList, 'calories')} kcal</Text>
          </View>

          <View style={styles.macroInfo}>
            {['carbs', 'protein', 'fat'].map((key, index) => (
              <Text key={key} style={styles.macroText}>
                {index === 0 ? '탄' : index === 1 ? '단' : '지'} {getTotal(foodList, key)}g
              </Text>
            ))}
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressSegment,
                { width: `${macroRatio.carbsRatio || 0}%`, backgroundColor: COLORS.primary },
              ]}
            >
              <Text style={styles.progressText}>{macroRatio.carbsRatio || 0}%</Text>
            </View>
            <View
              style={[
                styles.progressSegment,
                { width: `${macroRatio.proteinRatio || 0}%`, backgroundColor: COLORS.secondary },
              ]}
            >
              <Text style={styles.progressText}>{macroRatio.proteinRatio || 0}%</Text>
            </View>
            <View style={[styles.progressSegment, { width: `${macroRatio.fatRatio || 0}%` }]}>
              <Text style={styles.progressText}>{macroRatio.fatRatio || 0}%</Text>
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.foodListTitle}>{time}</Text>
          </View>
          {Array.isArray(foodList) && foodList.length > 0 ? (
            foodList.map((food) => {
              return (
                <FoodItem
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  amount={food.amount || food.serving_size}
                  calories={food.calories}
                  onHandleDeleteFood={handleDeleteFood}
                />
              );
            })
          ) : (
            <View style={styles.noFoodContainer}>
              <Text style={styles.noFoodText}>등록된 음식이 없습니다.</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          size="medium"
          text="추가"
          theme="primary"
          onPress={() => navigation.navigate('FoodDiary', { screen: 'FoodRecordScreen' })}
        />
        <CustomButton size="medium" text="확인" theme="secondary" onPress={handleConfirmButton} />
      </View>
    </SafeAreaView>
  );
};

const FoodItem = ({ id, name, calories, amount, onHandleDeleteFood }) => {
  return (
    <View style={styles.foodItem}>
      <View>
        <Text style={{ color: 'white', marginBottom: 5 }}>{name}</Text>
        <Text style={{ color: COLORS.white }}>{amount}g</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.foodCalories}>{calories}kcal</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => onHandleDeleteFood(id)}>
          <Image source={MinusButtonIcon} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    backgroundColor: COLORS.black,
  },
  carouselContainer: {
    height: width,
  },
  carouselItem: {
    width: width,
    height: width,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: 'white',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  addPhotoContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
  },
  addPhoto: {
    color: 'white',
    textAlign: 'center',
    fontFamily: FONTS.PRETENDARD[600],
    fontSize: FONT_SIZES.sm,
    marginTop: 15,
  },
  contentContainer: {
    padding: 20,
  },
  calorieContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calorieText: {
    color: 'white',
    fontFamily: FONTS.PRETENDARD[600],
    fontSize: FONT_SIZES.lg,
  },
  progressBar: {
    height: 20,
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: '#3A3A3A',
    borderRadius: RADIUS.small,
    overflow: 'hidden',
  },
  progressSegment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontSize: FONT_SIZES.xxs,
    fontFamily: FONTS.PRETENDARD[600],
  },
  macroInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroText: {
    color: 'white',
    fontFamily: FONTS.PRETENDARD[400],
  },
  foodListTitle: {
    color: 'white',
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
    marginVertical: 10,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
  },
  foodName: {
    color: 'white',
  },
  foodCalories: {
    color: 'white',
    marginRight: 10,
  },
  noFoodContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFoodText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[600],
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FoodRecordDetail;
