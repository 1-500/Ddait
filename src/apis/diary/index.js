// index
import { API } from '..';

export const getDiaryList = async (selected) => {
  try {
    const res = await API.get(`/workout-diary?date=${selected}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getExerciseList = async () => {
  try {
    const res = await API.get('/workout-diary/workout-info');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postWorkoutRecord = async (data) => {
  try {
    const res = await API.post('/workout-diary', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
