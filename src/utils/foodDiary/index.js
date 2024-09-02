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
