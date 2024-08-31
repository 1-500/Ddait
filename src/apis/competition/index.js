/* eslint-disable no-console */
import { API } from '..';

export const createCompetition = async (data) => {
  try {
    const response = await API.post('/competition/rooms', data);
    console.log('createCompetition 응답:', response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.error('createCompetitionRoom Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const enterCompetition = async (roomId) => {
  const postData = {
    competition_room_id: roomId,
  };
  try {
    const response = await API.post('/competition/record', postData);
    console.log('기록이 성공적으로 생성되었습니다:', response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.error('enterCompetition Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const getMyCompetition = async () => {
  try {
    const response = await API.get('/competition/rooms');
    console.log('getMyCompetition 응답:', response.data);
    return response;
  } catch (error) {
    if (error.response) {
      console.error('getMyCompetition Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};
