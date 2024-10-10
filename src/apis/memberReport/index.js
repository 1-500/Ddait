/* eslint-disable no-console */
import { API } from '../index';

export const postMemberReport = async (reported_member_id, competition_room_id, type, description) => {
  try {
    const response = await API.post('/member-report', {
      reported_member_id,
      competition_room_id,
      type,
      description,
    });

    if (response.status === 201) {
      console.log('Member report added successfully');
    } else {
      console.error('Failed to send notification');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
