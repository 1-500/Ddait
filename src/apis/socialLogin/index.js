import { API } from '..';

export const getUserlevel = async (social_email) => {
  try {
    const response = await API.get('/userlevel', {
      params: {
        social_email: social_email,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
