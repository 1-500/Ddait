import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomTag from '../../../../src/components/CustomTag';
import { getExerciseList, postWorkoutRecord } from '../../../apis/diary';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { BODY_FONT_SIZES, FONT_SIZES, HEADER_FONT_SIZES } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';
import useUserStore from '../../../store/sign/login';

const StartWorkout = () => {
  const navigation = useNavigation();

  const [exerciseListData, setExerciseListData] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [totalTime, setTotalTime] = useState({ minutes: 0, seconds: 0 });
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['80%', '80%'], []);

  const { userId } = useUserStore();

  /* eslint-disable */
  useEffect(() => {
    const fetchExerciseList = async () => {
      try {
        const res = await getExerciseList();
        const nameData = res.map((item) => item.name);
        setExerciseListData(nameData);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchExerciseList();
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);
  /* eslint-enable */

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handleExerciseSelect = (exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises((prev) => prev.filter((item) => item !== exercise));
    } else {
      setSelectedExercises((prev) => [...prev, exercise]);
    }
  };

  const handleTimerVisible = () => {
    setIsTimerVisible(!isTimerVisible);
  };

  const handleSaveSelectedExercises = () => {
    const newWorkoutData = selectedExercises.map((exerciseName, index) => ({
      id: index + workoutData.length + 1,
      title: exerciseName,
      workoutSet: [{ id: 1, weight: '', reps: '' }],
      time: 0,
      isRunning: false,
      restTime: 0,
      isResting: false,
    }));
    setWorkoutData((prev) => [...prev, ...newWorkoutData]);
    setSelectedExercises([]);
    bottomSheetModalRef.current?.close();
  };

  /* eslint-disable */
  const handleInputChange = (workoutId, setId, field, value) => {
    setWorkoutData((prevData) =>
      prevData.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              workoutSet: workout.workoutSet.map((set) => (set.id === setId ? { ...set, [field]: value } : set)),
            }
          : workout,
      ),
    );
  };
  /* eslint-enable */

  const handleAddExerciseSet = (workoutId) => {
    setWorkoutData((prevData) =>
      prevData.map(
        (workout) =>
          workout.id === workoutId
            ? /* eslint-disable */
              {
                ...workout,
                workoutSet: [
                  ...workout.workoutSet,
                  { id: workout.workoutSet.length + 1, weight: '', reps: '', isComplete: false },
                ],
              }
            : workout,
        /* eslint-enable */
      ),
    );
  };

  const handleStartPause = (workoutId) => {
    setWorkoutData((prevData) =>
      prevData.map((workout) => {
        if (workout.id === workoutId) {
          if (workout.isRunning) {
            // 정지 버튼을 눌렀을 때 타이머를 멈춤
            clearInterval(intervalId);
            return { ...workout, isRunning: false };
          } else {
            // 시작 버튼을 눌렀을 때 타이머를 시작
            const id = setInterval(() => {
              setTotalTime((prev) => {
                const newSeconds = prev.seconds + 1;
                const newMinutes = prev.minutes + Math.floor(newSeconds / 60);

                return {
                  minutes: newMinutes,
                  seconds: newSeconds % 60,
                };
              });
              setWorkoutData((prevData) =>
                prevData.map((workout) => {
                  if (workout.id === workoutId && workout.isRunning) {
                    return { ...workout, time: workout.time + 1 };
                  } else if (workout.id === workoutId && workout.isResting) {
                    return { ...workout, restTime: workout.restTime + 1 };
                  }
                  return workout;
                }),
              );
            }, 1000);
            setIntervalId(id);
            return { ...workout, isRunning: true, isResting: false };
          }
        }
        return workout;
      }),
    );
  };

  const handleRest = (workoutId) => {
    setWorkoutData((prevData) =>
      prevData.map((workout) => {
        if (workout.id === workoutId) {
          return { ...workout, isRunning: false, isResting: !workout.isResting };
        }
        return workout;
      }),
    );
  };
  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const handleDeleteExerciseSet = (workoutId, setId) => {
    setWorkoutData((prevData) =>
      prevData.map(
        (workout) =>
          workout.id === workoutId
            ? /* eslint-disable */
              {
                ...workout,
                workoutSet: workout.workoutSet.filter((set) => set.id !== setId),
              }
            : workout,
        /* eslint-enable */
      ),
    );
  };

  const handleCompleteExerciseSet = (workoutId, setId) => {
    setWorkoutData(
      (prevData) =>
        prevData.map((workout) =>
          workout.id === workoutId
            ? /* eslint-disable */
              {
                ...workout,
                workoutSet: workout.workoutSet.map((set) =>
                  set.id === setId ? { ...set, isComplete: !set.isComplete } : set,
                ),
              }
            : workout,
        ),
      /* eslint-enable */
    );
  };

  const handleSaveWorkoutRecord = async () => {
    try {
      const workoutName = '아침운동';
      const totalWorkoutTime = workoutData.reduce((total, workout) => total + workout.time, 0);
      const totalRestTime = workoutData.reduce((total, workout) => total + workout.restTime, 0);
      const formatTotalTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      };
      const workoutTime = formatTime(totalWorkoutTime);

      const exercises = workoutData.flatMap((workout) =>
        workout.workoutSet.map((set) => ({
          exercise_name: workout.title,
          weight: set.weight,
          reps: set.reps,
          set: set.id,
          exercise_time: workout.time,
          rest_time: workout.restTime,
        })),
      );
      const workoutRecord = {
        member_id: userId,
        workout_name: workoutName,
        workout_time: workoutTime,
        exercises,
      };

      const res = await postWorkoutRecord(userId, workoutRecord);

      /* eslint-disable */
      if (res) {
        Alert.alert('운동 기록', '정상적으로 저장되었습니다');
        navigation.navigate('WorkoutDiaryScreen');
      } else {
        Alert.alert('운동 기록', '기록 저장에 실패했습니다.');
        console.error('기록 저장에 실패했습니다.', res.error);
      }
    } catch (error) {
      console.log('error', error);
    }
    /* eslint-enable */
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const calculateTotalTimes = () => {
    return workoutData.reduce(
      (acc, workout) => {
        acc.totalWorkoutTime += workout.time;
        acc.totalRestTime += workout.restTime;
        return acc;
      },
      { totalWorkoutTime: 0, totalRestTime: 0 },
    );
  };
  const { totalWorkoutTime, totalRestTime } = calculateTotalTimes();

  const renderWorkoutCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.titleText}>{item.title}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.startButton} onPress={() => handleStartPause(item.id)}>
            <Text style={styles.startButtonText}>{item.isRunning ? '정지' : '시작'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startButton} onPress={() => handleRest(item.id)}>
            <Text style={styles.startButtonText}>{item.isResting ? '휴식 종료' : '휴식'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.workoutSetContainer}>
        <View style={styles.workoutSetHeader}>
          <Text style={styles.workoutSetText}>세트</Text>
          <Text style={styles.workoutSetText}>무게</Text>
          <Text style={styles.workoutSetText}>횟수</Text>
        </View>
        {item.workoutSet.map((set) => (
          <View key={set.id} style={styles.workoutSetRow}>
            <View style={styles.workoutSetInfo}>
              <Text style={styles.workoutSetText}>{set.id}</Text>
              <CustomInput
                size="small"
                theme="primary"
                value={set.weight}
                placeholder={set.weight}
                onChangeText={(value) => handleInputChange(item.id, set.id, 'weight', value)}
              />
              <CustomInput
                size="small"
                theme="primary"
                value={set.reps}
                placeholder={set.reps}
                onChangeText={(value) => handleInputChange(item.id, set.id, 'reps', value)}
              />
            </View>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              {set.isComplete ? (
                <MaterialCommunityIcons name="check-circle-outline" size={24} color={COLORS.grey} />
              ) : (
                <TouchableOpacity onPress={() => handleCompleteExerciseSet(item.id, set.id)}>
                  <MaterialCommunityIcons name="check-circle-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => handleDeleteExerciseSet(item.id, set.id)}>
                <MaterialCommunityIcons name="minus-circle-outline" size={24} color={TEXT_COLORS.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addSetButton} onPress={() => handleAddExerciseSet(item.id)}>
          <Text style={styles.addSetButtonText}>세트 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderExerciseList = ({ item }) => (
    <TouchableOpacity style={styles.exerciseItemContainer} onPress={() => handleExerciseSelect(item)}>
      <View style={styles.exerciseCheckboxContainer}>
        <MaterialCommunityIcons
          name={selectedExercises.includes(item) ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={24}
          color={COLORS.primary}
        />
      </View>
      <Text style={styles.exerciseItemText}>{item}</Text>
      <MaterialCommunityIcons name="bookmark-outline" size={24} color={TEXT_COLORS.secondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLORS.dark }}>
      <HeaderComponents title="운동 시작" />
      <View style={styles.timerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="timer-outline" size={24} color={COLORS.white} />
          <Text style={{ color: COLORS.white, marginLeft: 8, fontSize: BODY_FONT_SIZES.md }}>
            운동: {formatTime(totalWorkoutTime)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="timer-sand" size={24} color={COLORS.white} />
          <Text style={{ color: COLORS.white, marginLeft: 8, fontSize: BODY_FONT_SIZES.md }}>
            휴식: {formatTime(totalRestTime)}
          </Text>
        </View>
      </View>
      {workoutData.length === 0 && (
        <View style={styles.workoutContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>완료한 운동이 없네요!</Text>
            <Text style={styles.messageText}>오늘 운동하러 가볼까요?</Text>
          </View>
          <CustomButton
            theme="primary"
            size="large"
            states="enabled"
            onPress={handlePresentModalPress}
            text="운동 추가하기"
          />
        </View>
      )}
      <FlatList
        data={workoutData}
        renderItem={renderWorkoutCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View style={{ gap: 16 }}>
            <CustomButton
              theme="primary"
              size="large"
              states="enabled"
              onPress={handlePresentModalPress}
              text="운동 추가하기"
            />
            <CustomButton
              theme="secondary"
              size="large"
              states="enabled"
              onPress={handleSaveWorkoutRecord}
              text="운동 완료"
            />
          </View>
        }
      />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          enablePanDownToClose
          snapPoints={snapPoints}
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            <Text style={styles.exerciseHeader}>운동 추가</Text>
            <View>
              <CustomInput placeholder="하고자 하는 운동을 검색해보세요." theme="search" />
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 16 }}>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <CustomTag size="big" text="부위" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <CustomTag size="big" text="무게" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <CustomTag size="big" text="도구" />
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                data={exerciseListData}
                renderItem={renderExerciseList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
                keyExtractor={(item, index) => index.toString()}
              />
              <CustomButton
                theme="primary"
                size="large"
                states="enabled"
                onPress={handleSaveSelectedExercises}
                text="운동 추가하기"
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
};

export default StartWorkout;

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    height: 60,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaryContentContainer: {
    paddingTop: 16,
    flex: 1,
    ...LAYOUT_PADDING,
  },
  card: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: RADIUS.large,
    padding: 16,
    marginBottom: 16,
  },
  messageContainer: {
    borderRadius: 10,
    paddingVertical: 21,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: BACKGROUND_COLORS.greyDark,
    ...LAYOUT_PADDING,
  },
  messageText: {
    color: TEXT_COLORS.primary,
    fontSize: BODY_FONT_SIZES.md,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleText: {
    fontSize: HEADER_FONT_SIZES.sm,
    fontWeight: 'bold',
    color: TEXT_COLORS.primary,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.small,
  },
  startButtonText: {
    color: TEXT_COLORS.primary,
    fontSize: BODY_FONT_SIZES.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.primary,
    marginVertical: 8,
  },
  workoutSetContainer: {
    marginTop: 8,
  },
  workoutSetHeader: {
    flexDirection: 'row',
    gap: 35,
    marginBottom: 8,
  },
  workoutSetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  workoutSetInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  workoutSetText: {
    width: 50,
    height: 24,
    paddingTop: 4,
    textAlign: 'center',
    color: TEXT_COLORS.primary,
    fontSize: BODY_FONT_SIZES.md,
  },
  addSetButton: {
    marginTop: 16,
    backgroundColor: COLORS.grey,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.large,
  },
  addSetButtonText: {
    color: TEXT_COLORS.secondary,
    fontSize: BODY_FONT_SIZES.md,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COLORS.darkBackground,
    borderRadius: RADIUS.large,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: HEADER_FONT_SIZES.md,
    color: TEXT_COLORS.primary,
    marginBottom: 16,
  },

  workoutContainer: {
    backgroundColor: BACKGROUND_COLORS.dark,
    height: '100%',
    ...LAYOUT_PADDING,
    paddingTop: 20,
  },
  bottomSheetContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.dark,
    ...LAYOUT_PADDING,
  },
  exerciseItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLORS.greyDark,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: RADIUS.small,
    marginBottom: 8,
  },
  exerciseCheckboxContainer: {
    marginRight: 12,
  },
  exerciseItemText: {
    flex: 1,
    fontSize: BODY_FONT_SIZES.md,
    color: TEXT_COLORS.primary,
  },

  exerciseHeader: {
    marginVertical: 16,
    color: TEXT_COLORS.primary,
    fontSize: HEADER_FONT_SIZES.sm,
  },
});
