export function calculateCarbsCalories(carbsPercentage, totalCalories) {
  const carbs = (carbsPercentage / 100) * totalCalories;
  return Math.round(carbs / 4); // 탄수화물의 그램 수 (정수로 변환)
}

export function calculateProteinCalories(proteinPercentage, totalCalories) {
  const protein = (proteinPercentage / 100) * totalCalories;
  return Math.round(protein / 4); // 단백질의 그램 수 (정수로 변환)
}

export function calculateFatCalories(fatPercentage, totalCalories) {
  const fat = (fatPercentage / 100) * totalCalories;
  return Math.round(fat / 9); // 지방의 그램 수 (정수로 변환)
}

export function calculateTotalCalories(carbsGrams, proteinGrams, fatGrams) {
  return Math.round(carbsGrams * 4 + proteinGrams * 4 + fatGrams * 9); // 총 칼로리 (정수로 변환)
}

export function getFormattedDate() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, '0'); // 일은 1부터 시작

  return `${year}-${month}-${day}`;
}

export const getTotal = (array, key) => {
  if (!Array.isArray(array)) {
    return 0;
  }
  const total = array.reduce((sum, item) => {
    const value = item[key];
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);

  return parseFloat(total.toFixed(1));
};
export const calculateNutrientRatios = (array) => {
  if (!Array.isArray(array)) {
    return {
      carbsRatio: 0,
      proteinRatio: 0,
      fatRatio: 0,
    };
  }
  const totalNutrients = array.reduce(
    (totals, item) => {
      totals.carbs += item.carbs || 0;
      totals.protein += item.protein || 0;
      totals.fat += item.fat || 0;
      return totals;
    },
    { carbs: 0, protein: 0, fat: 0 },
  );

  const total = totalNutrients.carbs + totalNutrients.protein + totalNutrients.fat;

  return {
    carbsRatio: Math.floor((totalNutrients.carbs / total) * 100),
    proteinRatio: Math.floor((totalNutrients.protein / total) * 100),
    fatRatio: Math.floor((totalNutrients.fat / total) * 100),
  };
};

export function calculateTotalNutrition(mealNutritionInfo) {
  const totalNutrition = {
    totalCalories: 0,
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
  };

  for (const meal in mealNutritionInfo) {
    totalNutrition.totalCalories += mealNutritionInfo[meal].totalCalories || 0;
    totalNutrition.totalCarbs += mealNutritionInfo[meal].totalCarbs || 0;
    totalNutrition.totalProtein += mealNutritionInfo[meal].totalProtein || 0;
    totalNutrition.totalFat += mealNutritionInfo[meal].totalFat || 0;
  }

  // 각 총합을 반올림하여 소수점 없는 정수로 변환
  totalNutrition.totalCalories = Math.round(totalNutrition.totalCalories);
  totalNutrition.totalCarbs = Math.round(totalNutrition.totalCarbs);
  totalNutrition.totalProtein = Math.round(totalNutrition.totalProtein);
  totalNutrition.totalFat = Math.round(totalNutrition.totalFat);

  return totalNutrition;
}
export function calculateFoodNutrition(foodNutrition) {
  const ratio = foodNutrition.amount / foodNutrition.serving_size; // 입력된 총량에 대한 비율

  return {
    carbs: Math.round(foodNutrition.carbs * ratio), // 정수로 반올림
    protein: Math.round(foodNutrition.protein * ratio),
    fat: Math.round(foodNutrition.fat * ratio),
    calories: Math.round(foodNutrition.calories * ratio), // 칼로리도 정수로 반올림
  };
}
