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

export function getTotal(array, key) {
  return array.reduce((sum, item) => {
    return sum + (item[key] || 0);
  }, 0);
}
