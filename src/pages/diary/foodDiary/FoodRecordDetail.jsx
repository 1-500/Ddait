import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { deleteUserRecordFoodById, getFoodRecordByTime } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import useDiaryCalendarStore from '../../../store/food/calendar/index';
import useSelectedFoodTimeStore from '../../../store/index';
import { calculateNutrientRatios, getTotal } from '../../../utils/foodDiary/index';

const PlusButtonIcon = require('../../../assets/images/dietDiary/PluscircleButton.png');
const MinusButtonIcon = require('../../../assets/images/dietDiary/MinusCircleButton.png');

const FoodRecordDetail = () => {
  const navigation = useNavigation();
  const [foodRecordListState, setFoodRecordListState] = useState([]);
  const { time } = useSelectedFoodTimeStore();
  const { selected } = useDiaryCalendarStore();

  useFocusEffect(
    useCallback(() => {
      const fetchFoodRecord = async () => {
        try {
          const result = await getFoodRecordByTime({
            date: selected,
            mealTime: time,
          });
          if (result.error) {
            throw new Error(result.error);
          }
          setFoodRecordListState(result.data);
        } catch (error) {
          Alert.alert(error.message);
        }
      };

      fetchFoodRecord();
    }, [selected, time]),
  );

  const macroRatio = calculateNutrientRatios(foodRecordListState);

  const handleDeleteFood = async (id) => {
    try {
      const response = await deleteUserRecordFoodById(id);
      if (response.status === 200) {
        const updatedList = foodRecordListState.filter((item) => item.id !== id);
        setFoodRecordListState(updatedList);
        Alert.alert(response.message);
      } else {
        throw new Error('음식을 삭제하지 못하였습니다.');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents title={time} />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.6}>
            <Image source={PlusButtonIcon} style={styles.addButton} />
          </TouchableOpacity>
          <Text style={styles.addPhoto}>사진을 업로드하세요.</Text>
        </View>

        <ScrollView style={{ padding: 20 }}>
          <View style={styles.calorieContainer}>
            <Text style={styles.calorieText}>총 열량</Text>
            <Text style={styles.calorieText}>{getTotal(foodRecordListState, 'calories')} kcal</Text>
          </View>

          <View style={styles.macroInfo}>
            {['carbs', 'protein', 'fat'].map((key, index) => (
              <Text key={key} style={styles.macroText}>
                {index === 0 ? '탄' : index === 1 ? '단' : '지'} {getTotal(foodRecordListState, key)}g
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
          {foodRecordListState?.length > 0 ? (
            foodRecordListState.map((food) => {
              return (
                <FoodItem
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  serving_size={food.serving_size}
                  calories={food.calories}
                  onHandleDeleteFood={handleDeleteFood}
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
        <View style={styles.buttonContainer}>
          <CustomButton
            size="medium"
            text="추가"
            theme="primary"
            onPress={() => navigation.navigate('FoodDiary', { screen: 'FoodRecordScreen' })}
          />
          <CustomButton size="medium" text="확인" theme="secondary" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const FoodItem = ({ id, name, calories, serving_size, onHandleDeleteFood }) => {
  return (
    <View style={styles.foodItem}>
      <View>
        <Text style={{ color: 'white', marginBottom: 5 }}>{name}</Text>
        <Text style={{ color: COLORS.white }}>{serving_size}g</Text>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    height: 150,
    gap: 15,
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
  },
  calorieContainer: {
    display: 'flex',
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
  removeButton: {
    backgroundColor: '#5D5FEF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
  },
});
export default FoodRecordDetail;
