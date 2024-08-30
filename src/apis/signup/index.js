import { API } from '..';

export const emailAccountId = async (data) => {
  try {
    const response = await API.post('/accounts', data);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const socialLoginAccountId = async (data) => {
  try {
    const response = await API.post('/social/accounts', data);
    return response.data;
  } catch (error) {
    return error;
  }
};
