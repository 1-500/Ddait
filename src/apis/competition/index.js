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

// 전체 경쟁방 목록 조회
export const getAllCompetitions = async () => {
  try {
    const response = await API.get('competition/rooms');
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('전체 경쟁방 목록 조회 중 오류 발생:', error);
    throw error;
  }
};
