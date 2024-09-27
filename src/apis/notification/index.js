import { API } from '../index';

/* eslint-disable no-console */

export const getNotification = async () => {
  try {
    const response = await API.get('/notification');

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('getNotification Error:', error.response);
      throw error;
    } else {
      console.error('예상치 못한 오류 발생:', error.message);
      throw error;
    }
  }
};

export const sendNotification = async (token, notification) => {
  try {
    const response = await API.post('/notification', {
      token,
      notification,
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

export const patchNotification = async (notification_id, read) => {
  try {
    const response = await API.patch('/notification', {
      notification_id,
      read,
    });

    if (response.status === 200) {
      console.log('Notification updated successfully');
    } else {
      console.error('Failed to update notification');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteNotification = async (notification_id) => {
  try {
    const response = await API.delete(`/notification?notificationId=${notification_id}`);

    if (response.status === 200) {
      console.log('Notification deleted successfully');
    } else {
      console.error('Failed to delete notification');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
