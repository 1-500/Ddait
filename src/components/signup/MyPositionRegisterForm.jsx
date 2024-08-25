import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import useUserFormStore from '../../store/sign';

const MyPositionRegisterForm = () => {
  const { setPosition, nickName } = useUserFormStore();

  const handleMessage = (event) => {
    const { lat, lng } = JSON.parse(event.nativeEvent.data);
    setPosition(lat, lng);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{nickName}님의 위치는 어디신가요?</Text>
        <Text style={styles.subHeaderText}>주변 유저들을 추천해드릴게요!</Text>
      </View>
      <WebView
        originWhitelist={['*']}
        scrollEnabled={false}
        source={{ uri: 'https://develop.d1u3k3rakqogc7.amplifyapp.com/myPostion' }}
        style={{ flex: 1, width: '100%', height: 500 }}
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
    fontWeight: '600',
  },
  subHeaderText: {
    color: '#D9D9D9',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
});
export default MyPositionRegisterForm;
