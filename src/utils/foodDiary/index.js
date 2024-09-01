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
