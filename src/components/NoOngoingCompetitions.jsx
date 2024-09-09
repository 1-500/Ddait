import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BACKGROUND_COLORS, COLORS } from '../constants/colors';
import { FONT_SIZES, FONTS } from '../constants/font';
import CustomButton from './CustomButton';

const NoOngoingCompetitions = () => (
  <View style={styles.cardContainer}>
    <Text style={styles.boldText}>
      {'아직 진행중인 경쟁이 없네요..\n언른 '}
      <Text style={styles.highlightText}>따잇</Text>
      {'하러 가보실까요?'}
    </Text>
    <CustomButton text="+ 새로운 경쟁" theme="primary" size="medium" />
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  boldText: {
    alignSelf: 'stretch',
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
    paddingHorizontal: 40,
    textAlign: 'center',
  },
  highlightText: {
    color: COLORS.primary,
  },
});

export default NoOngoingCompetitions;
