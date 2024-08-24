import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import UserAgent from 'react-native-user-agent';
import WebView from 'react-native-webview';

import HeaderComponents from '../../components/HeaderComponents';

const SocialLogin = ({ route }) => {
  const { provider } = route.params;
  const [customUserAgent, setCustomUserAgent] = useState('customUserAgent');

  const webViewRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      await changeUserAgent();
    };
    fetch();
  }, []);

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

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponents title="소셜로그인" />
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        userAgent={customUserAgent}
        source={{ uri: 'http://localhost:3000/socialLogin' }}
        onLoad={() => {
          if (webViewRef.current) {
            const message = { type: 'DDait_APP', data: provider };
            webViewRef.current.postMessage(JSON.stringify(message));
          }
        }}
      />
    </View>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({});
