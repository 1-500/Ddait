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

// 전체 경쟁방 목록 조회
export const getAllCompetitions = async () => {
  try {
    const response = await API.get('competition/rooms');
    return response.data;
  } catch (error) {
    console.error('전체 경쟁방 목록 조회 중 오류 발생:', error);
    throw error;
  }
};

export const getCompetitionRooms = async () => {
  try {
    const response = await API.get('/competition/rooms');
    return response.data;
  } catch (error) {
    console.error('Server responded with status:', error.response.status);

    console.error('Response data:', error.response.data);
  }
};

export const getCompetitionRecord = async (roomId, memberId) => {
  try {
    let response;

    if (roomId) {
      if (memberId) {
        response = await API.get(`/competition/record?roomId=${roomId}&memberId=${memberId}`);
      }
      response = await API.get(`/competition/record?roomId=${roomId}`);
    } else {
      response = await API.get('/competition/record');
    }

    return response.data;
  } catch (error) {
    console.error('Server responded with status:', error.response.status);

    console.error('Response data:', error.response.data);
  }
};

export const patchCompetitionRecord = async (body) => {
  try {
    const response = await API.patch('/competition/record', body);

    return response.data;
  } catch (error) {
    console.error('Server responded with status:', error.response.status);

    console.error('Response data:', error.response.data);
  }
};

export const getCompetitionRecordDetail = async (roomId, memberId) => {
  try {
    const response = await API.get(`/competition/record/detail?roomId=${roomId}&memberId=${memberId}`);

    return response.data;
  } catch (error) {
    console.error('Server responded with status:', error.response.status);

    console.error('Response data:', error.response.data);
  }
};
