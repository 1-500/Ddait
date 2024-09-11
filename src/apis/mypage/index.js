import { API } from '..';

/* eslint-disable no-console */

export const postLogout = async () => {
  try {
    const response = await API.post('/logout');

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (updatedData) => {
  try {
    // 빈 객체인 경우 early return
    if (Object.keys(updatedData).length === 0) {
      return { message: '업데이트할 정보가 없습니다.' };
    }

    console.log('프로필 정보 변경:', updatedData);
    const response = await API.patch('/users/profile', updatedData);
    return response.data;
  } catch (error) {
    console.error('API 요청 중 error:', error.response || error);
    if (error.response && error.response.status === 400) {
      throw new Error('프로필 정보 업데이트 실패');
    }
    throw error;
  }
};
