import { API } from '..';

export const emailLogin = async (data) => {
  try {
    const response = await API.post('/login', data);

    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
