// index
import { API } from '..';

export const getDiaryList = async (userId, selected) => {
  try {
    const res = await API.get(`/workout-record?user_id=${userId}`, {
      // header에는 userId, params에는 선택된 날짜
      headers: {
        user_Id: userId,
      },
      params: {
        date: selected,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getExerciseList = async (userId) => {
  try {
    const res = await API.get(`/workout-record/exercise-name?user_id=${userId}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postWorkoutRecord = async (userId, data) => {
  try {
    const res = await API.post('/workout-record', data, {
      headers: {
        user_Id: userId,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
