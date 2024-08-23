import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, BUTTON_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';

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

  const handleStartWorkout = () => {
    navigation.navigate('StartWorkoutScreen');
  };

  const handleWorkoutTypePress = (type) => {
    setActiveWorkoutType(type);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <View style={{ height: 60, backgroundColor: '#fff' }}>
        <HeaderComponents
          icon="date"
          title="오늘 날짜 데이터를 기준 주"
          onDatePress={() => {
            navigation.navigate('WorkoutDatePickScreen');
          }}
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
              style={index === 0 ? styles.activeWorkoutType : styles.workoutType}
              onPress={() => handleWorkoutTypePress(type)}
            >
              <Text style={index === 0 ? styles.activeWorkoutTypeText : styles.workoutTypeText}>{type}</Text>
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
    </SafeAreaView>
  );
};

export default WorkoutDiary;

const styles = StyleSheet.create({
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
    borderRadius: RADIUS.large,
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
