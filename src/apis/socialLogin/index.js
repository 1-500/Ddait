/* eslint-disable no-console */
import { API } from '..';

export const getUserlevel = async (social_email) => {
  try {
    const response = await API.get('/userlevel', {
      params: {
        social_email: social_email,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const postAppleLogin = async (object) => {
  try {
    const response = await API.post('/social/login/apple', object);
    return response.data;
  } catch (error) {
    {
      console.error('apple 로그인시 에러가 발생했습니다.:', error.message);
      throw error;
    }
  }
};
