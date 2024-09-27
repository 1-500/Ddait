import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { createCustomFood, getUserBookMarkedFoodRecord, getUserCustomFoodRecord } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import useSelectedFoodsStore from '../../../store/food/selectedFoods/index';
const PlusIcon = require('../../../assets/images/dietDiary/PluscircleWhiteButton.png');
const checkIcon = require('../../../assets/images/dietDiary/checkIcon.png');

const FoodRecord = () => {
  const [tag, setTag] = useState(['북마크', '직접등록']);
  const [activeTag, setActiveTag] = useState('북마크');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const navigation = useNavigation();
  const [customModalFoodNameState, setCustomModalFoodNameState] = useState('');
  const [customModalCarbState, setCustomModalCarbState] = useState('');
  const [customModalProteinState, setCustomModalProteinState] = useState('');
  const [customModalFatState, setCustomModalFatState] = useState('');
  const [customModalCaloriesState, setCustomModalCaloriesState] = useState('');
  const [customModalServingSizeState, setCustomModalServingSizeState] = useState('');

  const [userFoodListState, setUserFoodListState] = useState([]);
  const { foodList, removeFood } = useSelectedFoodsStore();

  useEffect(() => {
    const fetchUserFood = async () => {
      try {
        let response;
        if (activeTag === '직접등록') {
          response = await getUserCustomFoodRecord();
          if (response.status !== 200) {
            throw new Error('데이터를 가져오지 못했습니다.');
          }
        } else if (activeTag === '북마크') {
          response = await getUserBookMarkedFoodRecord();
          if (response.status !== 200) {
            throw new Error('데이터를 가져오지 못했습니다.');
          }
        }
        setUserFoodListState(response.data);
      } catch (error) {}
    };
    fetchUserFood();
  }, [activeTag, isVisibleModal]);

  const handleCheckedFoods = (food) => {
    const isChecked = foodList.some((item) => item.id === food.id);
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
  const handleModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  const handleCustomModalButton = async () => {
    try {
      const food = {
        name: customModalFoodNameState,
        carbs: customModalCarbState,
        protein: customModalProteinState,
        fat: customModalFatState,
        calories: customModalCaloriesState,
        serving_size: customModalServingSizeState,
      };
      const result = await createCustomFood({
        food,
      });
      if (result.status !== 200) {
        throw new Error(result.message);
      }
      Alert.alert('음식을 생성하였습니다!');
    } catch (error) {
      Alert.alert(error.message);
    }
    setIsVisibleModal(false);
    return;
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
        <ScrollView style={styles.foodListContainer}>
          {userFoodListState?.length > 0 ? (
            userFoodListState.map((food) => {
              const isChecked = foodList.some((item) => item.id === food.id);

              return (
                <FoodItem
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  serving_size={food.serving_size}
                  calories={food.calories}
                  carbs={food.carbs}
                  onHandleCheckedFoods={() => handleCheckedFoods(food)}
                  protein={food.protein}
                  fat={food.fat}
                  isCheckFood={isChecked}
                />
              );
            })
          ) : (
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: FONT_SIZES.md, fontFamily: FONTS.PRETENDARD[600], color: 'white' }}>
                등록된 음식이 없습니다.
              </Text>
            </View>
          )}
        </ScrollView>
        <View style={{ display: 'flex', gap: 10 }}>
          <CustomButton size="large" text={`${foodList.length}개 선택됨`} theme="secondary" onPress={handleModal} />
          {activeTag === '직접등록' ? (
            <View style={styles.buttonContainer}>
              <CustomButton size="medium" text="직접 등록하기" theme="secondary" onPress={handleModal} />
              <CustomButton size="medium" text="기록하기" theme="primary" />
            </View>
          ) : (
            <>
              <CustomButton size="large" text="기록하기" theme="primary" />
            </>
          )}
        </View>
      </View>
      <Modal visible={isVisibleModal} animationType="slide" transparent={true} onRequestClose={handleModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={{ marginVertical: 20 }}>
              <CustomInput
                size="large"
                theme="user"
                placeholder="음식명을 입력하세요"
                onChangeText={(text) => setCustomModalFoodNameState(text)}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 10,
                gap: 20,
              }}
            >
              <View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>탄수화물</Text>
                <CustomInput size="small" theme="primary" onChangeText={(text) => setCustomModalCarbState(text)} />
              </View>
              <View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>단백질</Text>
                <CustomInput size="small" theme="primary" onChangeText={(text) => setCustomModalProteinState(text)} />
              </View>
              <View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>지방</Text>
                <CustomInput size="small" theme="primary" onChangeText={(text) => setCustomModalFatState(text)} />
              </View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                alignSelf: 'flex-end',
                marginVertical: 20,
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>열량</Text>
                  <CustomInput
                    size="small"
                    theme="primary"
                    onChangeText={(text) => setCustomModalCaloriesState(text)}
                  />
                  <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>kcal</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginVertical: 10,
                  }}
                >
                  <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>내용량</Text>
                  <CustomInput
                    size="small"
                    theme="primary"
                    onChangeText={(text) => setCustomModalServingSizeState(text)}
                  />
                  <CustomInput size="small" theme="primary" value="g" />
                </View>
              </View>
            </View>
            <CustomButton theme="primary" size="large" text="등록하기" onPress={handleCustomModalButton} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const FoodItem = ({ id, name, serving_size, calories, carbs, protein, fat, isCheckFood, onHandleCheckedFoods }) => {
  const navigation = useNavigation();
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: COLORS.darkBackground,
    borderRadius: RADIUS.large,
    padding: 20,
    alignItems: 'center',
  },
});

export default FoodRecord;
