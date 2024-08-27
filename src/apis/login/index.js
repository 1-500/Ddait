import { API } from '..';

export const emailLogin = async (data) => {
  try {
    const response = await API.post('/login', data);

    return response.data;
  } catch (error) {
    return error;
  }
};
