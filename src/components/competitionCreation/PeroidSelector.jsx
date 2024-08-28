import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONT_WEIGHTS } from '../../constants/font';
import CustomInput from '../CustomInput';
const calendar = require('../../assets/images/calendar.png');

const PeroidSelector = ({
  onPressStartInput,
  onPressEndInput,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const formatDateString = (date) => {
    if (!date || !date.year || !date.month || !date.day) {
      return '';
    }
    return `${date.year}/${date.month}/${date.day}`;
  };

  return (
    <View style={styles.periodSelectorContainer}>
      <CustomInput
        size="stretch"
        theme="primary"
        placeholder="시작 날짜"
        value={formatDateString(startDate)}
        onPress={onPressStartInput}
        onChangeText={onStartDateChange}
      />
      <Text style={styles.dateSeparator}>~</Text>
      <CustomInput
        size="stretch"
        theme="primary"
        placeholder="종료 날짜"
        value={formatDateString(endDate)}
        onPress={onPressEndInput}
        onChangeText={onEndDateChange}
      />
      <Pressable>
        <Image source={calendar} />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  periodSelectorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
  dateSeparator: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
});
export default PeroidSelector;
