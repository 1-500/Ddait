import { API } from './index';

/* eslint-disable no-console */

const sendNotification = async (token, title, body) => {
  try {
    const response = await API.post('/sendNotification', {
      token,
      title,
      body,
    });

    if (response.status === 200) {
      console.log('Notification sent successfully');
    } else {
      console.error('Failed to send notification');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export default sendNotification;
