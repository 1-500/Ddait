import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { calculateFoodNutrition } from '../../../utils/foodDiary/index';

const FoodInfo = ({ navigation }) => {
  const route = useRoute();
  const { name, calories, serving_size, carbs, protein, fat } = route.params;
  const [foodInfoState, setFoodInfoState] = useState({
    name,
    calories,
    carbs: carbs.toFixed(1),
    protein: protein.toFixed(1),
    fat: fat.toFixed(1),
    serving_size,
  });

  const handleServingSizeInput = (element) => {
    const foodNutrition = {
      serving_size: Number(serving_size),
      amount: Number(element),
      carbs: carbs,
      protein: protein,
      fat: fat,
      calories: calories,
    };
    const food = calculateFoodNutrition(foodNutrition);

    setFoodInfoState((prev) => ({
      ...prev,
      calories: food.calories,
      carbs: food.carbs,
      protein: food.protein,
      fat: food.fat,
    }));
  };

  return (
    <SafeAreaView>
      <HeaderComponents title={name} />
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginVertical: 30 }}>
          <CustomInput
            size="medium"
            theme="primary"
            defaultValue={foodInfoState.serving_size.toString()}
            onChangeText={handleServingSizeInput}
          />
          <CustomInput size="medium" theme="primary" value="g" />
        </View>

        <View style={styles.foodInfoContainer}>
          <View style={styles.mainRow}>
            <Text style={styles.mainValue}>{foodInfoState.calories}</Text>
            <Text style={styles.unit}>kcal</Text>
          </View>
          <View style={[styles.row, styles.borderedRow]}>
            <Text style={styles.label}>탄수화물</Text>
            <Text style={styles.value}>{foodInfoState.carbs}g</Text>
          </View>
          <View style={[styles.row, styles.borderedRow]}>
            <Text style={styles.label}>단백질</Text>
            <Text style={styles.value}>{foodInfoState.protein}g</Text>
          </View>
          <View style={[styles.row, styles.lastRow]}>
            <Text style={styles.label}>지방</Text>
            <Text style={styles.value}>{foodInfoState.fat}g</Text>
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          <CustomButton theme="primary" size="large" text="추가하기" />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FoodInfo;

const styles = StyleSheet.create({
  foodInfoContainer: {},
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  mainValue: {
    fontFamily: FONTS.PRETENDARD[600],
    fontSize: FONT_SIZES.xl,
    color: COLORS.white,
  },
  unit: {
    fontFamily: FONTS.PRETENDARD[600],
    fontSize: FONT_SIZES.sm,
    color: '#888',
  },
  label: {
    fontSize: 16,
    color: 'white',
  },
  value: {
    fontSize: 16,
    color: 'white',
  },
  borderedRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
});