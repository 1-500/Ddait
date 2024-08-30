import { API } from '..';

export const postLogout = async () => {
  try {
    const response = await API.post('/logout');

    return response.data;
  } catch (error) {
    return error;
  }
};
