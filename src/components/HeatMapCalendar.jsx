import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { FONTS } from '../constants/font';

// 강조 색상
const colorLevels = ['#E0E0FF', '#A9A9FF', '#7A7AFF', '#5D5DFC', '#3A3ADC'];

// 수치 기준
const getColorForValue = (value) => {
  if (value >= 80) {
    return colorLevels[4];
  }
  if (value >= 60) {
    return colorLevels[3];
  }
  if (value >= 40) {
    return colorLevels[2];
  }
  if (value >= 20) {
    return colorLevels[1];
  }
  return colorLevels[0];
};

const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();
const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

const HeatmapCalendar = ({ year, month, squareGap = 5, highlightData = [] }) => {
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  // 빈 공간을 포함한 전체 날짜 배열 생성
  const daysArray = [...Array(firstDayOfMonth).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  // 주별로 나누기 위한 배열
  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  // 날짜를 문자열 형태로 변환하는 함수
  const formatDate = (day) => `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {weekDays.map((day, index) => (
          <View key={index} style={[styles.square]}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>
      {weeks.map((week, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { marginVertical: squareGap / 2 }]}>
          {week.map((day, index) => {
            const dateString = day ? formatDate(day) : '';
            const highlight = highlightData.find((item) => item.date === dateString);
            const color = highlight ? getColorForValue(highlight.value) : COLORS.grey; // 기본 색상

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
    borderRadius: 10,
  },
  text: {
    color: COLORS.white,
    fontSize: 10,
    fontFamily: FONTS.PRETENDARD[400],
  },
  weekDayText: {
    color: COLORS.white,
    fontSize: 12,
    fontFamily: FONTS.PRETENDARD[400],
  },
});

export default HeatmapCalendar;
