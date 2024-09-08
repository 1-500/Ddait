import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Sign');
    }, 3000); // 3초
    // eslint-disable-next-line
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView source={require('../../assets/DDait.json')} autoPlay loop={true} style={styles.animation} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  animation: {
    width: 500,
    height: 500,
  },
});
