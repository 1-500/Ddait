import dayjs from 'dayjs';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
const calendar = require('../../assets/images/calendar.png');

const PeroidSelector = ({ onPressStartInput, onPressEndInput, startDate, endDate }) => {
  const formatDateString = (date) => {
    return dayjs(date).format('YYYY/MM/DD');
  };

  return (
    <View style={styles.periodSelectorContainer}>
      <View style={styles.datePickerWrapper}>
        <TouchableOpacity style={styles.dateInput} onPress={onPressStartInput} activeOpacity={0.6}>
          <Text style={styles.dateText}>{formatDateString(startDate)}</Text>
        </TouchableOpacity>
        <Text style={styles.dateSeparator}>~</Text>
        <TouchableOpacity style={styles.dateInput} onPress={onPressEndInput} activeOpacity={0.6}>
          <Text style={styles.dateText}>{formatDateString(endDate)}</Text>
        </TouchableOpacity>
      </View>
      <Pressable>
        <Image source={calendar} />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  periodSelectorContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  dateInput: {
    borderRadius: RADIUS.small,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  dateText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
  },
  dateSeparator: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    fontFamily: FONTS.PRETENDARD[600],
  },
});
export default PeroidSelector;
