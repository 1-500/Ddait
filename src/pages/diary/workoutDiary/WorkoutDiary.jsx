import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { getDiaryList } from '../../../apis/diary';
import CustomButton from '../../../components/CustomButton';
import { BACKGROUND_COLORS, BUTTON_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';
import useDiaryCalendarStore from '../../../store/food/calendar/index';
import { useToastMessageStore } from '../../../store/toastMessage/toastMessage';

const WorkoutDiary = () => {
  const navigation = useNavigation();
  const { selected } = useDiaryCalendarStore();
  const [workoutRecords, setWorkoutRecords] = useState([]);
  const { showToast } = useToastMessageStore();

  /* eslint-disable */
  useFocusEffect(
    useCallback(() => {
      const fetchWorkout = async () => {
        try {
          const res = await getDiaryList(selected);
          setWorkoutRecords(res);
        } catch (error) {
          console.log('error: ', error);
          showToast(`에러메세지 : ${error}`, 'error', 1000, 'top', 80);
        }
      };

      fetchWorkout();
    }, [selected]),
  );
  /*eslint-enable */

  const handleStartWorkout = () => {
    navigation.navigate('WorkoutDiary', { screen: 'StartWorkoutScreen' });
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

  const renderEmptyMessage = () => {
    if (selected === new Date().toISOString().split('T')[0]) {
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
          <Text style={styles.messageText}>{`${selected}에는 운동한 기록이 없네요 🥲`}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.workoutContainer}>
      {workoutRecords.length === 0 ? (
        renderEmptyMessage()
      ) : (
        <FlatList data={workoutRecords} renderItem={renderWorkoutRecord} keyExtractor={(item) => item.id.toString()} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  workoutContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    height: '100%',
    ...LAYOUT_PADDING,
    paddingTop: 20,
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
    fontFamily: FONTS.PRETENDARD[600],
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
    fontFamily: FONTS.PRETENDARD[700],
  },
  recordDurationText: {
    color: TEXT_COLORS.secondary,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
  },
  exerciseContainer: {
    paddingVertical: 8,
    gap: 8,
  },
  exerciseHeaderText: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[500],
  },
  exerciseText: {
    color: TEXT_COLORS.secondary,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
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
    fontFamily: FONTS.PRETENDARD[700],
  },
});
export default WorkoutDiary;
