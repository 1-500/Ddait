import { API } from '..';

export const postOnboarding = async (data) => {
  try {
    const response = await API.post('/onboarding', data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
