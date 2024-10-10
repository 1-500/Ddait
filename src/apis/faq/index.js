/* eslint-disable no-console */
import { API } from '..';

export const getFAQ = async () => {
  try {
    const response = await API.get('/faq');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('getFAQ Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};
