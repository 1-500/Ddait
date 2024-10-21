import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { getUserBookMarkedFoodRecord, getUserCustomFoodRecord } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import useSelectedFoodsStore from '../../../store/food/selectedFoods/index';
import { useToastMessageStore } from '../../../store/toastMessage/toastMessage';
const PlusIcon = require('../../../assets/images/dietDiary/PluscircleWhiteButton.png');
const checkIcon = require('../../../assets/images/dietDiary/checkIcon.png');
import { useFocusEffect } from '@react-navigation/native';

const FoodRecord = () => {
  const { showToast } = useToastMessageStore();
  const [tag, setTag] = useState(['북마크', '직접등록']);
  const [activeTag, setActiveTag] = useState('북마크');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userFoodListState, setUserFoodListState] = useState([]);
  const { foodList, removeFood } = useSelectedFoodsStore();

  useFocusEffect(
    useCallback(() => {
      const fetchUserFood = async () => {
        try {
          let response;
          setLoading(true); // 로딩 상태 설정

          if (activeTag === '직접등록') {
            response = await getUserCustomFoodRecord();
            if (response.status !== 200) {
              throw new Error('직접 등록한 음식의 데이터를 가져오지 못했습니다.');
            }
          } else if (activeTag === '북마크') {
            response = await getUserBookMarkedFoodRecord();
            if (response.status !== 200) {
              throw new Error('북마크한 음식의 데이터를 가져오지 못했습니다.');
            }
          }

          setUserFoodListState(response.data);
        } catch (error) {
          showToast(error.message, 'error', 2000, 'top');
        } finally {
          setLoading(false); // 로딩 상태 해제
        }
      };

      fetchUserFood();
    }, [activeTag, showToast]), // 의존성 배열
  );

  const handleCheckedFoods = (food) => {
    const isChecked = Array.isArray(foodList) && foodList.some((item) => item.id === food.id);
    if (isChecked) {
      removeFood(food.id);
    } else {
      navigation.navigate('FoodInfoScreen', {
        id: food.id,
        name: food.name,
        serving_size: food.serving_size,
        calories: food.calories,
        carbs: food.carbs,
        protein: food.protein,
        fat: food.fat,
      });
    }
  };

  const handleTag = (type) => {
    setActiveTag(type);
  };

  const handleCustomRecordButton = () => {
    navigation.navigate('FoodDiary', {
      screen: 'CustomFoodRecordScreen',
    });
  };

  const handleRecordButton = () => {
    navigation.navigate('FoodDiary', {
      screen: 'FoodDetailScreen',
    });
  };
  const handleSelectedButton = () => {
    navigation.navigate('FoodDiary', {
      screen: 'FoodDetailScreen',
    });
  };

  const renderFoodItem = ({ item }) => {
    const isChecked = Array.isArray(foodList) && foodList.some((food) => food.id === item.id);
    return (
      <FoodItem
        id={item.id}
        name={item.name}
        serving_size={item.serving_size}
        calories={item.calories}
        carbs={item.carbs}
        onHandleCheckedFoods={() => handleCheckedFoods(item)}
        protein={item.protein}
        fat={item.fat}
        isCheckFood={isChecked}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <HeaderComponents title="음식 기록" />
      <View style={styles.container}>
        <View style={{ marginVertical: 5 }}>
          <CustomInput
            style={{ padding: 10 }}
            theme="search"
            size="large"
            placeholder="음식명 검색"
            onPress={() => navigation.navigate('FoodDiary', { screen: 'FoodSearchScreen' })}
          />
        </View>

        <View style={styles.tagContainer}>
          {tag.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={type === activeTag ? styles.activeTag : styles.tag}
              onPress={() => handleTag(type)}
            >
              <Text style={type === activeTag ? styles.activeTagText : styles.tagText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {loading ? (
          <View style={{ marginVertical: 15 }}>
            <SkeletonLoader type="foodRecordItem" />
          </View>
        ) : (
          <FlatList
            data={userFoodListState}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.foodListContainer}
            ListEmptyComponent={() => (
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <Text style={{ fontSize: FONT_SIZES.md, fontFamily: FONTS.PRETENDARD[600], color: 'white' }}>
                  등록된 음식이 없습니다.
                </Text>
              </View>
            )}
          />
        )}

        <View style={{ display: 'flex', gap: 10 }}>
          <CustomButton
            size="large"
            text={`${foodList.length}개 선택됨`}
            theme="secondary"
            onPress={handleSelectedButton}
          />
          {activeTag === '직접등록' ? (
            <View style={styles.buttonContainer}>
              <CustomButton size="medium" text="직접 등록하기" theme="secondary" onPress={handleCustomRecordButton} />
              <CustomButton size="medium" text="기록하기" theme="primary" onPress={handleRecordButton} />
            </View>
          ) : (
            <>
              <CustomButton size="large" text="기록하기" theme="primary" onPress={handleRecordButton} />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const FoodItem = ({ id, name, serving_size, calories, carbs, protein, fat, isCheckFood, onHandleCheckedFoods }) => {
  return (
    <TouchableOpacity style={styles.foodItem}>
      <View>
        <Text style={{ color: 'white', marginBottom: 5, fontSize: FONT_SIZES.sm }}>{name}</Text>
        <Text style={{ color: COLORS.white }}>{serving_size}g</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'white', marginRight: 10, fontSize: FONT_SIZES.sm }}>{calories}kcal</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={onHandleCheckedFoods}>
          <Image source={isCheckFood ? checkIcon : PlusIcon} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },

  tagContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: RADIUS.large,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
  },
  activeTag: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTagText: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
  },
  tagText: {
    color: TEXT_COLORS.secondary,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
  },
  foodListContainer: {
    marginVertical: 15,
    height: 150,
  },
  foodListTitle: {
    color: 'white',
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FoodRecord;
