import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { getDiaryList } from '../../../apis/diary';
import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, BUTTON_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';
import { formatDate, getEndOfWeek, getStartOfWeek, getWeekOfMonth } from '../../../utils/date';

const WorkoutDiary = () => {
  const navigation = useNavigation();
  const today = new Date();
  const todayFormatted = formatDate(today);
  const [weekOfMonth, setWeekOfMonth] = useState(`${today.getMonth() + 1}월 ${getWeekOfMonth(today)}째주`);
  const [weekDays, setWeekDays] = useState([]);
  const [workoutTypes, setWorkoutTypes] = useState(['웨이트', '러닝', '식단', '등산']);
  const [activeWorkoutType, setActiveWorkoutType] = useState('웨이트');
  const bottomSheetRef = useRef(null);
  const [selected, setSelected] = useState(today.toISOString().split('T')[0]);
  const [selectedDayInfo, setSelectedDayInfo] = useState(today); // 자세한 day 정보 2024-08-01T00:00:00.000Z
  const [selectedDate, setSelectedDate] = useState(today);
  const [workoutRecords, setWorkoutRecords] = useState([]);

  /* eslint-disable */

  useEffect(() => {
    if (selectedDate === today) {
      updateWeekDays(today);
    }
  }, []);

  useEffect(() => {
    console.log(selected);
    const fetchWorkout = async () => {
      try {
        const res = await getDiaryList(selected);
        console.log(res);
        setWorkoutRecords(res);
      } catch (error) {
        console.log('error: ', error);
      }
    };

    fetchWorkout();
  }, [selected]);
  /* eslint-disable */

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['80%', '80%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handleStartWorkout = () => {
    navigation.navigate('StartWorkoutScreen');
  };

  const handleWorkoutTypePress = (type) => {
    if (type === '식단') {
      navigation.navigate('FoodDiary', {
        screen: 'FoodDiaryScreen',
      });
    } else if (type === '웨이트') {
      navigation.navigate('WorkoutDiary', {
        screen: 'WorkoutDiaryScreen',
      });
    }
    setActiveWorkoutType(type);
  };

  const handleCalendarDayPress = (day) => {
    //2024-08-01T00:00:00.000Z 이런 형식으로 Date객체 생성
    const selectedCalendarDate = new Date(day.timestamp);
    const selectedCalendarDateString = selectedCalendarDate.toISOString().split('T')[0];

    setSelected(selectedCalendarDateString);
    setSelectedDayInfo(selectedCalendarDate);
    // setSelectedDayInfo(day);
    const weekOfMonth = `${selectedCalendarDate.getMonth() + 1}월 ${getWeekOfMonth(selectedCalendarDate)}째주`;
    setWeekOfMonth(weekOfMonth);

    updateWeekDays(selectedCalendarDate);
    bottomSheetModalRef.current?.close();
  };

  const handleWeekDayPress = (day) => {
    // 인자값 day를 기준으로 날짜 객체를 생성
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

  const updateWeekDays = (date) => {
    const startOfWeek = getStartOfWeek(date);
    const endOfWeek = getEndOfWeek(date);
    const days = [];

    for (let i = startOfWeek; i <= endOfWeek; i.setDate(i.getDate() + 1)) {
      days.push(i.getDate()); // 주간 날짜의 '일' 부분만 저장
    }

    setWeekDays(days);
  };

  const renderWorkoutRecord = ({ item }) => (
    <View style={styles.workoutRecordContainer}>
      <View style={styles.recordHeader}>
        <Text style={styles.recordText}>{item.title}</Text>
        <Text style={styles.recordDurationText}>{item.time}</Text>
      </View>
      <View style={styles.recordContainer}>
        <View>
          {item.workout_record &&
            item.workout_record.map((exercise, index) => (
              <View key={index} style={styles.exerciseContainer}>
                <Text style={styles.exerciseHeaderText}>{exercise.workout_info.name}</Text>
                <Text style={styles.exerciseText}>{exercise.set}세트</Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  );

  const formatSelectedDate = (date) => {
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };
  const renderEmptyMessage = () => {
    const formattedSelectedDate = formatSelectedDate(selectedDate);
    if (selectedDate.toISOString().split('T')[0] === todayFormatted) {
      return (
        <>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>완료한 운동이 없네요!</Text>
            <Text style={styles.messageText}>오늘 운동하러 가볼까요?</Text>
          </View>
          <CustomButton
            theme="primary"
            size="large"
            states="enabled"
            onPress={handleStartWorkout}
            text="운동 시작하기"
          />
        </>
      );
    } else {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{`${formattedSelectedDate}에는 운동한 기록이 없네요 🥲`}</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <View style={{ height: 60, backgroundColor: '#fff' }}>
        <HeaderComponents
          icon="date"
          title={weekOfMonth}
          onDatePress={handlePresentModalPress} // 헤더 버튼 클릭 시 바텀시트 열기
        />
      </View>

      <View style={styles.dateContainer}>
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
        {workoutRecords.length === 0 ? (
          renderEmptyMessage()
        ) : (
          <FlatList
            data={workoutRecords}
            renderItem={renderWorkoutRecord}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          enablePanDownToClose
          snapPoints={snapPoints}
        >
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
    fontSize: FONT_SIZES.sm,
  },
  activeDayText: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.sm,
  },
  diaryContentContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    height: '100%',
    ...LAYOUT_PADDING,
    paddingTop: 20,
  },
  workoutTypesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  workoutType: {
    paddingVertical: 10,
    paddingHorizontal: 18,
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
    fontSize: FONT_SIZES.md,
  },
  activeWorkoutTypeText: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.md,
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

  workoutRecordContainer: {
    paddingVertical: 16,
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.lightGrey,
  },
  recordContainer: {
    backgroundColor: BACKGROUND_COLORS.dark,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: RADIUS.small,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recordText: {
    color: TEXT_COLORS.secondary,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  recordDurationText: {
    color: TEXT_COLORS.secondary,
    fontSize: FONT_SIZES.sm,
  },
  exerciseContainer: {
    paddingVertical: 8,
    gap: 8,
  },
  exerciseHeaderText: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.lg,
  },
  exerciseText: {
    color: TEXT_COLORS.secondary,
    fontSize: FONT_SIZES.sm,
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
