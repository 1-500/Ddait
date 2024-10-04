import axios from 'axios';

import { API } from '..';

export const createFoodDiary = async (date) => {
  try {
    const response = await API.post(`food/diary/create?date=${date}`);
    return response.data;
  } catch (error) {}
};

export const setMacroRatio = async (data) => {
  try {
    const response = await API.post(`food/diary/set/macroRatio?date=${data.date}`, data);
    return response.data;
  } catch (error) {}
  return;
};
export const setUserWeight = async (data) => {
  try {
    const response = await API.post(`food/diary/set/weight?date=${data.date}`, data);
    return response.data;
  } catch (error) {}
  return;
};

export const getFoodRecordByTime = async (data) => {
  try {
    const response = await API.get(
      `food/record/?date=${data.date}&meal_time=${encodeURIComponent(data.mealTime)}`,
      data,
    );
    return response.data;
  } catch (error) {}
};

export const getFoodBySearch = async (term) => {
  try {
    const response = await API.get(`food/search/?term=${encodeURIComponent(term)}`);
    return response.data;
  } catch (error) {}
};
export const createFoodRecordByTime = async (data) => {
  try {
    const response = await API.post('food/record/create', data);
    return response.data;
  } catch (error) {}
};
export const createBookMarkFoods = async (data) => {
  try {
    const response = await API.post('food/bookmark/create', data);
    return response.data;
  } catch (error) {}
};
export const getBookMarkFoods = async () => {
  try {
    const response = await API.get('food/bookmark');
    return response.data;
  } catch (error) {}
};
export const createCustomFood = async (data) => {
  try {
    const response = await API.post('food/customfood/create', data);
    return response.data;
  } catch (error) {}
};

export const getUserFoodDiary = async (date) => {
  try {
    const response = await API.get(`food/diary?date=${date}`);
    return response.data;
  } catch (error) {}
};
export const getUserTotalFoodRerord = async (date) => {
  try {
    const response = await API.get(`food/record/total?date=${date}`);
    return response.data;
  } catch (error) {}
};
export const getUserCustomFoodRecord = async () => {
  try {
    const response = await API.get('food/record/customfood');
    return response.data;
  } catch (error) {}
};
export const getUserBookMarkedFoodRecord = async () => {
  try {
    const response = await API.get('food/record/bookmark');
    return response.data;
  } catch (error) {}
};
export const deleteUserRecordFoodById = async (id) => {
  try {
    const response = await API.post(`food/record/delete?id=${id}`);
    return response.data;
  } catch (error) {}
};
export const postUserRecordImages = async (formData) => {
  try {
  } catch (error) {
    throw error;
  }
};
