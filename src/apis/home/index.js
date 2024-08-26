import { API } from '..';

export const getTest = async () => {
  try {
    const res = await API.get('/');
    return res.data;
  } catch (error) {
    return error;
  }
};
