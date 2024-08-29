import { API } from '..';

export const createCompetition = async (data) => {
  const userId = 2; // 하드코딩해두고 추후 수정

  try {
    const response = await API.post('/competition', data);
    const postRecordData = {
      competition_room_id: response.data.room_id,
      member_id: userId,
    };
    await API.post('/competition/record', postRecordData); //기록 생성 바로 요청

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Server responded with status:', error.response.status);
    // eslint-disable-next-line no-console
    console.error('Response data:', error.response.data);
  }
};

export const getCompetitionRooms = async () => {
  try {
    const response = await API.get('/competition/rooms');
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Server responded with status:', error.response.status);
    // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.error('Server responded with status:', error.response.status);
    // eslint-disable-next-line no-console
    console.error('Response data:', error.response.data);
  }
};

export const patchCompetitionRecord = async (body) => {
  try {
    const response = await API.patch('/competition/record', body);

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Server responded with status:', error.response.status);
    // eslint-disable-next-line no-console
    console.error('Response data:', error.response.data);
  }
};

export const getCompetitionRecordDetail = async (roomId, memberId) => {
  try {
    const response = await API.get(`/competition/record/detail?roomId=${roomId}&memberId=${memberId}`);

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Server responded with status:', error.response.status);
    // eslint-disable-next-line no-console
    console.error('Response data:', error.response.data);
  }
};
