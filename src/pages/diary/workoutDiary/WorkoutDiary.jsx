import BottomSheet, { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, BUTTON_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';

LocaleConfig.locales.fr = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: 'Aujourd hui',
};

LocaleConfig.defaultLocale = 'fr';

const getWeekOfMonth = (date) => {
  const startWeekDayIndex = 0; // 일요일 0, 월요일 1
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const numOfDays = lastDate.getDate();
  const weekInMonth = Math.ceil((date.getDate() + firstDate.getDay() - startWeekDayIndex) / 7);

  return weekInMonth;
};

const WorkoutDiary = () => {
  const navigation = useNavigation();
  const today = new Date();
  const weekOfMonth = getWeekOfMonth(today);

  const [weekDays, setWeekDays] = useState(['21', '22', '23', '24', '25', '26', '27']);
  const [workoutTypes, setWorkoutTypes] = useState(['웨이트', '러닝', '식단', '등산']);
  const [activeWorkoutType, setActiveWorkoutType] = useState('웨이트');
  const bottomSheetRef = useRef(null);

  const [selected, setSelected] = useState(today.toISOString().split('T')[0]);
  const [selectedDayInfo, setSelectedDayInfo] = useState('');

  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handleStartWorkout = () => {
    navigation.navigate('StartWorkoutScreen');
  };

  const handleWorkoutTypePress = (type) => {
    if (type === '식단') {
      navigation.navigate('DietDiary', {
        screen: 'DietDiaryScreen',
      });
    } else if (type === '웨이트') {
      navigation.navigate('WorkoutDiary', {
        screen: 'WorkoutDiaryScreen',
      });
    }
    setActiveWorkoutType(type);
  };

  const openCalendarSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleDayPress = (day) => {
    setSelected(day.dateString);
    setSelectedDayInfo(day);
    bottomSheetRef.current?.close();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <View style={{ height: 60, backgroundColor: '#fff' }}>
        <HeaderComponents
          icon="date"
          title="오늘 날짜 데이터를 기준 주"
          onDatePress={openCalendarSheet} // 헤더 버튼 클릭 시 바텀시트 열기
        />
      </View>

      <View style={styles.dateContainer}>
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <TouchableOpacity key={index} style={day === '23' ? styles.activeDay : styles.day}>
              <Text style={day === '23' ? styles.activeDayText : styles.dayText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.workoutTypesContainer}>
          {workoutTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={type === activeWorkoutType ? styles.activeWorkoutType : styles.workoutType}
              onPress={() => handleWorkoutTypePress(type)}
            >
              <Text style={type === activeWorkoutType ? styles.activeWorkoutTypeText : styles.workoutTypeText}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.diaryContentContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>완료한 운동이 없네요!</Text>
          <Text style={styles.messageText}>오늘 운동하러 가볼까요?</Text>
        </View>

        <CustomButton theme="primary" size="large" states="enabled" onPress={handleStartWorkout} text="운동 시작하기" />
      </View>

      <BottomSheet ref={bottomSheetRef} onChange={handleSheetChanges} snapPoints={['80%', '80%']} enablePanDownToClose>
        <BottomSheetView style={styles.contentContainer}>
          <Calendar
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#1C1C1C',
              height: '100%',
              color: '#E0E0E0',
            }}
            current={selected}
            onDayPress={handleDayPress}
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
      </BottomSheet>
    </SafeAreaView>
  );
};

export default WorkoutDiary;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.greyDark,
  },

  dateContainer: {
    paddingVertical: 16,
    alignItems: 'center',
    ...LAYOUT_PADDING,
  },
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
    fontSize: 14,
  },
  activeDayText: {
    color: TEXT_COLORS.primary,
    fontSize: 14,
  },
  diaryContentContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    height: '100%',
    ...LAYOUT_PADDING,
  },
  workoutTypesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    marginVertical: 16,
  },
  workoutType: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: RADIUS.small,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLORS.greyDark,
  },
  activeWorkoutType: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutTypeText: {
    color: TEXT_COLORS.secondary,
    fontSize: 14,
  },
  activeWorkoutTypeText: {
    color: TEXT_COLORS.primary,
    fontSize: 14,
  },
  messageContainer: {
    borderRadius: 10,
    paddingVertical: 21,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: BACKGROUND_COLORS.dark,
  },
  messageText: {
    color: TEXT_COLORS.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  startButtonContainer: {
    backgroundColor: BUTTON_COLORS.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  startButtonText: {
    color: TEXT_COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
