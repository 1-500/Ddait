import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { FONTS } from '../../constants/font';
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
    marginVertical: 24,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontFamily: FONTS.PRETENDARD[600],
  },
  subHeaderText: {
    color: '#D9D9D9',
    fontSize: 16,
    fontFamily: FONTS.PRETENDARD[600],
    marginTop: 10,
  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: 500,
  },
});
export default MyPositionMap;
