export function calculateCarbsCalories(carbsPercentage, totalCalories) {
  const carbs = (carbsPercentage / 100) * totalCalories;
  return Math.floor(carbs / 4); // 탄수화물의 그램 수 (정수로 변환)
}

export function calculateProteinCalories(proteinPercentage, totalCalories) {
  const protein = (proteinPercentage / 100) * totalCalories;
  return Math.floor(protein / 4); // 단백질의 그램 수 (정수로 변환)
}

export function calculateFatCalories(fatPercentage, totalCalories) {
  const fat = (fatPercentage / 100) * totalCalories;
  return Math.floor(fat / 9); // 지방의 그램 수 (정수로 변환)
}

export function calculateTotalCalories(carbsGrams, proteinGrams, fatGrams) {
  return Math.floor(carbsGrams * 4 + proteinGrams * 4 + fatGrams * 9); // 총 칼로리 (정수로 변환)
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
  return array.reduce((sum, item) => {
    const value = item[key];
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);
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

  return totalNutrition;
}

export function calculateFoodNutrition(foodNutrition) {
  const ratio = foodNutrition.amount / foodNutrition.serving_size; // 입력된 총량에 대한 비율

  return {
    carbs: (foodNutrition.carbs * ratio).toFixed(1), // 소수점 1자리까지
    protein: (foodNutrition.protein * ratio).toFixed(1),
    fat: (foodNutrition.fat * ratio).toFixed(1),
    calories: Math.round(foodNutrition.calories * ratio),
  };
}
