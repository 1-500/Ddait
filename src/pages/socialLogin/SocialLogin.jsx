import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import UserAgent from 'react-native-user-agent';
import WebView from 'react-native-webview';

import HeaderComponents from '../../components/HeaderComponents';
import useUserStore from '../../store/sign/login';

const SocialLogin = ({ route }) => {
  const { provider } = route.params;
  const isFocused = useIsFocused();

  const [customUserAgent, setCustomUserAgent] = useState('customUserAgent');

  const navigation = useNavigation();
  const { setUserLevel, setToken, setSocialEmail } = useUserStore();

  const webViewRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      await changeUserAgent();
    };
    fetch();
    return () => {
      if (webViewRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        webViewRef.current.stopLoading();
      }
    };
  }, []);

  const handleMessage = (event) => {
    const { socialEmail, user_level, token } = JSON.parse(event.nativeEvent.data);
    if (user_level === 0) {
      setSocialEmail(socialEmail);
      setUserLevel(user_level); // 온보딩 진행
      Alert.alert('아직 온보딩을 진행하지 않으셨군요 !');

      navigation.navigate('Sign', {
        screen: 'SignUp',
      });
    } else if (user_level >= 1) {
      // 로그인 성공 홈으로 이동 전역상태 관리라이브러리에 email과 user_level, token정보저장

      setToken(token);
      setSocialEmail(socialEmail);
      setUserLevel(user_level);
      navigation.navigate('MainTab', {
        screen: 'Home',
      });
    }
  };

  const changeUserAgent = async () => {
    // UserAgent 데이터 변경
    const userAgent = await UserAgent.getWebViewUserAgent() //asynchronous
      .then((result) => {
        const agent =
          Platform.OS === 'ios'
            ? result + ' Safari/604.1' //IOS 인 경우, 마지막에 해당 값 추가
            : result?.substring(0, result?.indexOf('Chrome')); //AOS인 경우, Chrome 부터 제거

        setCustomUserAgent(agent); // 값 세팅

        return result;
      })
      .catch((e) => e);
  };
  const sendMessageToWeb = (message) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify(message));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponents title="소셜로그인" />
      {isFocused && (
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          userAgent={customUserAgent}
          source={{ uri: 'http://localhost:3000/socialLogin' }}
          onMessage={handleMessage}
          onLoad={() => {
            sendMessageToWeb({ type: 'DDait_APP', data: provider });
          }}
          onLoadStart={() => {
            sendMessageToWeb({ type: 'DDait_APP', data: provider });
          }}
          onLoadEnd={() => sendMessageToWeb({ type: 'PAGE_LOADED', data: provider })}
        />
      )}
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({});
