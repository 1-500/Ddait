import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getDiaryList } from '../../../apis/diary';
import CustomButton from '../../../components/CustomButton';
import DiaryCalendar from '../../../components/DiaryCalendar';
import DiaryCalendarBottomSheet from '../../../components/DiaryCalendarBottomSheet';
import DiaryTypePicker from '../../../components/DiaryTypePicker';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, BUTTON_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';
import useDiaryCalendarStore from '../../../store/food/calendar/index';
import FoodDiary from '../foodDiary/FoodDiary';

const WorkoutDiary = () => {
  const bottomSheetModalRef = useRef(null);
  const { weekOfMonth, activeType } = useDiaryCalendarStore();

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <View style={{ height: 60, backgroundColor: '#fff' }}>
        <HeaderComponents icon="date" title={weekOfMonth} onDatePress={openBottomSheet} />
      </View>

      <View style={styles.dateContainer}>
        <DiaryCalendar />
        <DiaryTypePicker />
      </View>

      {renderComponent(activeType)}

      <DiaryCalendarBottomSheet ref={bottomSheetModalRef} />
    </SafeAreaView>
  );
};

const WorkoutDiaryComponent = () => {
  const navigation = useNavigation();
  const { selected } = useDiaryCalendarStore();
  const [workoutRecords, setWorkoutRecords] = useState([]);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await getDiaryList(selected);
        setWorkoutRecords(res);
      } catch (error) {
        // console.log('error: ', error);
      }
    };

    fetchWorkout();
  }, [selected]);
  const handleStartWorkout = () => {
    navigation.navigate('StartWorkoutScreen');
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

  return (
    <View style={styles.workoutContainer}>
      {workoutRecords.length === 0 ? (
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
      ) : (
        <FlatList data={workoutRecords} renderItem={renderWorkoutRecord} keyExtractor={(item) => item.id.toString()} />
      )}
    </View>
  );
};

const renderComponent = (type) => {
  switch (type) {
    case '식단':
      return <FoodDiary />;

    default:
      return <WorkoutDiaryComponent />;
  }
};

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
  workoutContainer: {
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
export default WorkoutDiary;
