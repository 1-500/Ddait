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

// 내 경쟁방 목록 조회
export const getMyCompetition = async () => {
  try {
    const response = await API.get('/competition/rooms/my');
    // console.log('getMyCompetition 응답:', response.data);
    return response.data;
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
    // console.log('getAllCompetitions 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('전체 경쟁방 목록 조회 중 오류 발생:', error);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

// 경쟁방 상세 조회
export const getCompetitionDetail = async (id) => {
  try {
    const response = await API.get(`competition/rooms/${id}`);
    // console.log('getCompetitionDetail 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('경쟁방 상세 조회 중 오류 발생:', error);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const getCompetitionRecord = async (roomId) => {
  try {
    const response = await API.get(`/competition/record?roomId=${roomId}`);

    return response.data;
  } catch (error) {
    console.error('Server responded with status:', error.response.status);

    console.error('Response data:', error.response.data);
    throw error;
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

export const getCompetitionRecordDetail = async (roomId) => {
  try {
    const response = await API.get(`/competition/record/detail?roomId=${roomId}`);

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 406) {
      // 406 에러는 record detail이 없는 경우로 처리 (참가전)
      return { data: null, status: 200 };
    }
    console.error('Server responded with status:', error.response.status);

    console.error('Response data:', error.response.data);
    throw error;
  }
};

export const leaveCompetition = async (roomId) => {
  const postData = {
    competition_room_id: roomId,
  };
  try {
    const response = await API.delete('/competition/record', { data: postData });
    console.log('경쟁방 나가기 성공');
    return response;
  } catch (error) {
    if (error.response) {
      console.error('경쟁방 나가기 오류:', error);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const deleteCompetition = async (roomId) => {
  try {
    const response = await API.delete('/competition/rooms', {
      data: { competition_room_id: roomId },
    });
    console.log('deleteCompetition 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('deleteCompetition Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const inviteCompetition = async (roomId, friendId) => {
  try {
    const response = await API.post('/competition/invite', {
      competition_room_id: roomId,
      recipient_id: friendId,
    });
    console.log('inviteCompetition 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('inviteCompetition Error:', error.response);
      return error.response;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};
