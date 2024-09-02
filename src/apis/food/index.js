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