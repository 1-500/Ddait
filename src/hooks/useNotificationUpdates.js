import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

import { sendNotification } from '../apis/notification';
import { supabase } from '../lib/supabaseClient';
import useUserStore from '../store/sign/login';

/* eslint-disable */

const useNotificationUpdates = () => {
  const { userId } = useUserStore();
  useEffect(() => {
    const channel = supabase
      .channel('notification')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notification' }, async (payload) => {
        const notification = payload.new;
        if (notification.member_id === userId) {
          const token = await messaging().getToken();
          await sendNotification(token, notification);
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
