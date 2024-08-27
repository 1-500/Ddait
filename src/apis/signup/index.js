import { API } from '..';

export const emailAccountId = async (data) => {
  try {
    const response = await API.post('/accounts', data);
    return response;
  } catch (error) {
    return error;
  }
};
