import { API } from '..';

export const createCompetition = async (data) => {
  const userId = 2;

  const payload = {
    ...data,
    user_id: userId,
  };

  try {
    const response = await API.post('/competition', payload);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating competition:', error);
    throw error;
  }
};
