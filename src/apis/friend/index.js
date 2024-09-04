/* eslint-disable no-console */
import { API } from '..';

export const searchUser = async (nickname) => {
  try {
    const response = await API.get(`/users/search?nickname=${nickname}`);
    console.log('searchUser 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('searchUser Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};
