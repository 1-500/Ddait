import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import useUserFormStore from '../../store/sign/signup';

const MyPositionMap = () => {
  const { setPosition } = useUserFormStore();

  const handleMessage = (event) => {
    const { lat, lng } = JSON.parse(event.nativeEvent.data);
    setPosition(lat, lng);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        scrollEnabled={false}
        source={{ uri: 'https://develop.d1u3k3rakqogc7.amplifyapp.com/myPostion' }}
        style={styles.webViewContainer}
        onMessage={handleMessage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
  },
});
export default MyPositionMap;
