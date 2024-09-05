/* eslint-disable react/react-in-jsx-scope */
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../constants/colors';
import { FONT_SIZES } from '../constants/font';
import useDiaryCalendarStore from '../store/food/calendar';
import { getEndOfWeek, getStartOfWeek, getWeekOfMonth } from '../utils/date';

const windowWidth = Dimensions.get('window');

const DiaryCalendarBottomSheet = forwardRef(({}, ref) => {
  const snapPoints = useMemo(() => ['80%', '80%'], []);

  const { selected, setSelected, setSelectedDayInfo, setWeekOfMonth, setWeekDays } = useDiaryCalendarStore();

  const handleCalendarDayPress = (day) => {
    const selectedCalendarDate = new Date(day.timestamp);
    const selectedCalendarDateString = selectedCalendarDate.toISOString().split('T')[0];
    setSelected(selectedCalendarDateString);
    setSelectedDayInfo(selectedCalendarDate);
    const weekOfMonth = `${selectedCalendarDate.getMonth() + 1}월 ${getWeekOfMonth(selectedCalendarDate)}째주`;
    setWeekOfMonth(weekOfMonth);
    updateWeekDays(selectedCalendarDate);
    ref.current?.close();
  };
  const updateWeekDays = (date) => {
    const startOfWeek = getStartOfWeek(date);
    const endOfWeek = getEndOfWeek(date);
    const days = [];

    for (let i = startOfWeek; i <= endOfWeek; i.setDate(i.getDate() + 1)) {
      days.push(i.getDate()); // 주간 날짜의 '일' 부분만 저장
    }

    setWeekDays(days);
  };

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose
        snapPoints={snapPoints}
        backgroundComponent={({ style }) => <View style={[style, styles.pickerContainer]} />}
      >
        <BottomSheetView style={{ flex: 1, backgroundColor: BACKGROUND_COLORS.greyDark }}>
          <Calendar
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#1C1C1C',
              height: '100%',
              color: '#E0E0E0',
            }}
            current={selected}
            onDayPress={handleCalendarDayPress}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: COLORS.primary,
                selectedTextColor: COLORS.white,
              },
            }}
            theme={{
              backgroundColor: '#1C1C1C',
              calendarBackground: '#1C1C1C',
              textSectionTitleColor: '#5D5DFC',
              monthTextColor: '#E0E0E0',
              selectedDayBackgroundColor: '#5D5DFC',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#5D5DFC',
              dayTextColor: '#E0E0E0',
              textDisabledColor: '#3C3C3C',
              arrowColor: '#5D5DFC',
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});
const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: '#383838',
    width: windowWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

export default DiaryCalendarBottomSheet;
