import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';

const OnboardStart = () => {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeText}>환영합니다! 🎉</Text>
      <Text style={styles.welcomeSubText}>따잇과 함께 운동 습관을 길러봐요!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: FONT_SIZES.xxl,
    color: COLORS.primary,
    fontFamily: FONTS.PRETENDARD[700],
    textAlign: 'center',
  },
  welcomeSubText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.lightGrey,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OnboardStart;
