import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONTS } from '../constants/font';
import { RADIUS } from '../constants/radius';

// 강조 색상
const colorLevels = [
  { threshold: 80, color: '#3A3ADC' },
  { threshold: 60, color: '#5D5DFC' },
  { threshold: 40, color: '#7A7AFF' },
  { threshold: 20, color: '#A9A9FF' },
  { threshold: 0, color: '#E0E0FF' },
];
const getColorForValue = (value) => colorLevels.find(({ threshold }) => value >= threshold).color;

// 달의 첫 요일
const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();
// 달의 마지막날
const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const HeatmapCalendar = ({ year, month, squareGap = 5, highlightData = [] }) => {
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);

  // 월 전체 날짜 배열 (빈 날짜 포함)
  const daysArray = [...Array(firstDayOfMonth).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  //주별로 나누기
  const weeks = Array.from({ length: Math.ceil(daysArray.length / 7) }, (_, i) => daysArray.slice(i * 7, i * 7 + 7));

  //YYYY-MM-DD
  const formatDate = (day) => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {weekDays.map((day, index) => (
          <View key={index} style={styles.square}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
      {weeks.map((week, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { marginVertical: squareGap / 2 }]}>
          {week.map((day, index) => {
            const dateString = day ? formatDate(day) : '';
            const highlight = highlightData.find((item) => item.date === dateString);
            const color = highlight ? getColorForValue(highlight.value) : COLORS.grey;

            return (
              <View key={index} style={[styles.square, { backgroundColor: color, marginHorizontal: squareGap / 2 }]}>
                {day && <Text style={styles.text}>{day}</Text>}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RADIUS.small,
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xxs,
    fontFamily: FONTS.PRETENDARD[400],
  },
  weekDayText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xxs,
    fontFamily: FONTS.PRETENDARD[400],
  },
});

export default HeatmapCalendar;
