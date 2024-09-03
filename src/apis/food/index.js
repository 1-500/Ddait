import { getFormattedDate } from '../../utils/foodDiary/index';
import { API } from '..';

export const setMacroRatio = async (data) => {
  try {
    const response = await API.post(`food-diary/setMacroRatio?date=${getFormattedDate()}`, data);
    return response.data;
  } catch (error) {}
  return;
};
export const setUserWeight = async (data) => {
  try {
    const response = await API.post(`food-diary/setWeight?date=${getFormattedDate()}`, data);
    return response.data;
  } catch (error) {}
  return;
};

export const getFoodRecordByTime = async (data) => {
  try {
    const response = await API.get(
      `food-record/?date=${getFormattedDate()}&meal_time=${encodeURIComponent('아침')}`,
      data,
    );
    return response.data;
  } catch (error) {}
};

export const getTotal = (array, key) => {
  return array.reduce((sum, item) => {
    return sum + (item[key] || 0);
  }, 0);
};
export const calculateNutrientRatios = (arr) => {
  const totalNutrients = arr.reduce(
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
