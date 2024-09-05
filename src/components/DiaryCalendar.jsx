/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../constants/colors';
import { FONT_SIZES } from '../constants/font';
import useDiaryCalendarStore from '../store/food/calendar';
import { getEndOfWeek, getStartOfWeek, getWeekOfMonth } from '../utils/date';

const DiaryCalendar = () => {
  const { selected, setSelected, setSelectedDayInfo, setWeekOfMonth, setWeekDays, weekDays } = useDiaryCalendarStore();

  useEffect(() => {
    updateWeekDays(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateWeekDays = (date) => {
    const startOfWeek = getStartOfWeek(date);
    const endOfWeek = getEndOfWeek(date);
    const days = [];

    for (let i = startOfWeek; i <= endOfWeek; i.setDate(i.getDate() + 1)) {
      days.push(i.getDate()); // 주간 날짜의 '일' 부분만 저장
    }
    setWeekDays(days);
  };

  const handleWeekDayPress = (day) => {
    // 인자값 day를 기준으로 날짜 객체를 생성
    const today = new Date();
    const selectedDate = new Date(today.getFullYear(), today.getMonth(), day);
    // 로컬 시간을 기반으로 날짜를 조정
    const selectedDateWithOffset = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60 * 1000);
    // ISO형식 날짜 조정하기 => 2024-08-24 형태로
    const selectedDateDateString = selectedDateWithOffset.toISOString().split('T')[0];
    setSelected(selectedDateDateString);
    setSelectedDayInfo(selectedDateWithOffset);
    const weekOfMonth = `${selectedDateWithOffset.getMonth() + 1}월 ${getWeekOfMonth(selectedDateWithOffset)}째주`;
    setWeekOfMonth(weekOfMonth);

    updateWeekDays(selectedDateWithOffset);
  };

  return (
    <View style={styles.weekDaysContainer}>
      {weekDays.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={new Date(selected).getDate() === day ? styles.activeDay : styles.day} // 선택된 날짜와 비교
          onPress={() => handleWeekDayPress(day)}
        >
          <Text style={new Date(selected).getDate() === day ? styles.activeDayText : styles.dayText}>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  monthText: {
    color: TEXT_COLORS.secondary,
    fontSize: 16,
    marginBottom: 8,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  day: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: BACKGROUND_COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDay: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: TEXT_COLORS.secondary,
    fontSize: FONT_SIZES.sm,
  },
  activeDayText: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.sm,
  },
});

export default DiaryCalendar;
