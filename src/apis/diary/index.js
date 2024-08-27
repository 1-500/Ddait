// index
import { API } from '..';

export const getDiaryList = async (userId) => {
  try {
    const res = await API.get(`/workout-record?user_id=${userId}`, {
      // header에는 userId, params에는 선택된 날짜
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
