/* eslint-disable no-console */
import { API } from '..';

export const searchUser = async (nickname) => {
  try {
    const response = await API.get(`/users/search?nickname=${nickname}`);
    console.log('searchUser 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('searchUser Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const getMyFriends = async () => {
  try {
    const response = await API.get('/friends');
    console.log('getMyFriends 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('getMyFriends Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const getMyFriendsNotParticipant = async (roomId) => {
  try {
    const response = await API.get(`/friends/notParticipant?roomId=${roomId}`);
    console.log('getMyFriends 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('getMyFriends Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const getReqSent = async () => {
  try {
    const response = await API.get('/friends/request/send');
    console.log('getReqSent 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('getReqSent Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};
export const getReqReceived = async () => {
  try {
    const response = await API.get('/friends/request/receive');
    console.log('getReqReceived 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('getReqReceived Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const requestFriend = async (memberId) => {
  console.log('memberId:', memberId);
  const postData = {
    friend_member_id: memberId,
  };

  try {
    const response = await API.post('friends/request', postData);
    console.log('requestFriend 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('requestFriend Error: ', error.response.data);
      throw Error(error.response.data.message);
    } else {
      console.error('예상치 못한 오류 발생:', error);
      throw error;
    }
  }
};

export const acceptRequest = async (reqId) => {
  try {
    const response = await API.patch(`friends/accept/?req_id=${reqId}`);
    console.log('acceptRequest 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response.data) {
      console.error('acceptRequest Error:', error.response.data);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error);
      throw error;
    }
  }
};

export const cancelRequest = async (reqId) => {
  try {
    const response = await API.delete(`friends/request/?req_id=${reqId}`);
    console.log('cancelRequest 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response.data) {
      console.error('cancelRequest Error:', error.response.data);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error);
      throw error;
    }
  }
};

export const deleteFriend = async (reqId) => {
  try {
    const response = await API.delete(`friends/?req_id=${reqId}`);
    console.log('deleteFriend 응답:', response.data);
    return response.data;
  } catch (error) {
    if (error.response.data) {
      console.error('deleteFriend Error:', error.response.data);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error);
      throw error;
    }
  }
};
