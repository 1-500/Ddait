/* eslint-disable no-console */
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

export const postWorkoutInfoBookmark = async (workoutData) => {
  console.log('전송할 데이터:', {
    bookMarkedWorkouts: [workoutData],
  });

  try {
    const res = await API.post('/workout-diary/bookmark', {
      bookMarkedWorkouts: [workoutData],
    });

    return res.data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// 북마크된 운동 목록을 가져오는 함수
export const getWorkoutInfoBookmark = async () => {
  try {
    const res = await API.get('/workout-diary/bookmark');
    return res.data;
  } catch (error) {
    console.error('Error fetching bookmarked exercises:', error);
    return [];
  }
};
