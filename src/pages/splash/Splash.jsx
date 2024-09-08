import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Sign');
    }, 3000); // 3초
    // eslint-disable-next-line
  }, []);

  const getAnimationSource = () => {
    if (Platform.OS === 'android') {
      return require('../../assets/animations/DDait_android.json');
    }
    return require('../../assets/animations/DDait_ios.json');
  };

  return (
    <View style={styles.container}>
      <LottieView source={getAnimationSource()} autoPlay loop={false} style={styles.animation} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 500,
    height: 500,
  },
});
