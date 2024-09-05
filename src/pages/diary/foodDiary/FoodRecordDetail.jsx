import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getFoodRecordByTime } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { calculateNutrientRatios, getTotal } from '../../../utils/foodDiary/index';

const PlusButtonIcon = require('../../../assets/images/dietDiary/PluscircleButton.png');
const MinusButtonIcon = require('../../../assets/images/dietDiary/MinusCircleButton.png');

const FoodRecordDetail = ({ route }) => {
  const { time } = route.params;
  const navigation = useNavigation();
  const [foodRecordListState, setFoodRecordListState] = useState([]);
  useEffect(() => {
    const fetchFoodRecord = async () => {
      try {
        const result = await getFoodRecordByTime();
        if (result.error) {
          throw new Error(result.error);
        }
        setFoodRecordListState(result.data);
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    fetchFoodRecord();
  }, []);

  const macroRatio = calculateNutrientRatios(foodRecordListState);

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
                <FoodInfoCard
                  key={food.id}
                  name={food.name}
                  serving_size={food.serving_size}
                  calories={food.calories}
                />
              );
            })
          ) : (
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: FONT_SIZES.md, fontFamily: FONT_WEIGHTS.semiBold, color: 'white' }}>
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

const FoodInfoCard = ({ name, calories, serving_size }) => {
  return (
    <View style={styles.foodItem}>
      <View>
        <Text style={{ color: 'white', marginBottom: 5 }}>{name}</Text>
        <Text style={{ color: COLORS.white }}>{serving_size}g</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.foodCalories}>{calories}kcal</Text>
        <TouchableOpacity activeOpacity={0.6}>
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
