import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

import { sendNotification } from '../apis/notification';
import { supabase } from '../lib/supabaseClient';
import { useNotificationStore } from '../store/notification';
import useUserStore from '../store/sign/login';

/* eslint-disable */

const useNotificationUpdates = () => {
  const { userId } = useUserStore();
  const { notificationList, setNotificationList } = useNotificationStore();

  useEffect(() => {
    const channel = supabase
      .channel('notification')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notification' }, async (payload) => {
        const notification = payload.new;
        console.log('notification update: ', payload.new);
        if (notification.member_id === userId) {
          const token = await messaging().getToken();
          await sendNotification(token, notification);
          setNotificationList([notification, ...notificationList]);
        }
      })
      .subscribe();

    return () => {
      console.log('채널 해제 시도:', channel);
      channel.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);
};

export default useNotificationUpdates;
