// index
import { API } from '..';

export const getDiaryList = async (userId) => {
  try {
    const res = await API.get(`/workout-record?user_id=${userId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
