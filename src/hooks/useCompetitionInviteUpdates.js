import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

import sendNotification from '../apis/sendNotification';
import { supabase } from '../lib/supabaseClient';
import { useToastMessageStore } from '../store/toastMessage/toastMessage';

/* eslint-disable */

const useCompetitionInviteUpdates = () => {
  const { showToast } = useToastMessageStore();
  useEffect(() => {
    const channel = supabase
      .channel('competition_invite_notify')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'competition_invite' }, async (payload) => {
        const { sender_id, competition_room_id } = payload.new;
        showToast('새로운 경쟁 초대가 도착했습니다!', 'success');

        const { data: competitionRoom } = await supabase
          .from('competition_room')
          .select('title')
          .eq('id', competition_room_id)
          .single();

        // member 테이블에서 nickname 가져오기
        const { data: sender } = await supabase.from('member').select('nickname').eq('id', sender_id).single();

        const token = await messaging().getToken();
        await sendNotification(
          token,
          '새로운 경쟁 초대',
          `${sender.nickname}님이 ${competitionRoom.title} 경쟁방에 초대했습니다!`,
        );
      })
      .subscribe();

    return () => {
      console.log('채널 해제 시도:', channel);
      channel.unsubscribe();
      supabase.removeChannel(channel);
    };
  }, []);
};

export default useCompetitionInviteUpdates;
