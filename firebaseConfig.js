import messaging from '@react-native-firebase/messaging';

import { patchNotification } from './src/apis/notification';

/* eslint-disable no-console */

export const setupFirebaseMessaging = (navigation, showToast) => {
  // remoteMessage에 따라 navigate 처리
  const navigateByNotification = async (remoteMessage) => {
    console.log(remoteMessage);
    const type = remoteMessage.data.type;

    switch (type) {
      case 'competition_invite':
        const { screen: competitionScreen, competition_room_id } = remoteMessage.data;

        if (competitionScreen && competition_room_id) {
          navigation.navigate(competitionScreen, { competitionId: competition_room_id, isParticipant: false });
        }
        break;
      case 'friends':
        const { screen: friendScreen } = remoteMessage.data;
        navigation.navigate(friendScreen, { initialState: 1 });
        break;
    }

    await patchNotification(remoteMessage.data.notification_id, true);
  };

  // 푸시 알림 권한 요청
  messaging()
    .requestPermission()
    .then((authStatus) => {
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      } else {
        console.warn('Authorization status:', authStatus);
      }
    });

  // 푸시 알림 수신 핸들러 설정
  const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
    console.log('FCM Message Data:', remoteMessage);

    showToast('새 알림이 도착했습니다!', 'success');
    // 여기서 알림 처리 (예: UI 업데이트)
    // 예: Alert.alert('푸시 알림', remoteMessage.notification.body);
  });

  // 백그라운드에서 메시지 수신 핸들러 설정
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('FCM Background Message Data:', remoteMessage.data);
    // 백그라운드에서 알림을 처리 (예: 로컬 알림 생성)
  });

  // 포그라운드에서 푸시 알림을 받았을 때
  const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp((remoteMessage) => {
    navigateByNotification(remoteMessage);
  });

  // 백그라운드에서 알림을 클릭하여 앱이 실행될 때
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        navigateByNotification(remoteMessage);
      }
    });

  // 푸시 알림 토큰 가져오기
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      // 서버에 토큰을 전송하여 푸시 알림을 전송할 수 있도록 설정
      // 예: await sendTokenToServer(token);
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  getToken();

  // 토큰 갱신 처리
  const unsubscribeOnTokenRefresh = messaging().onTokenRefresh((token) => {
    console.log('Refreshed FCM Token:', token);
    // 서버에 새로운 토큰을 업데이트
    // 예: await updateTokenOnServer(token);
  });

  return {
    unsubscribeOnMessage,
    unsubscribeOnNotificationOpenedApp,
    unsubscribeOnTokenRefresh,
  };
};
