import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  getExerciseList,
  getWorkoutInfoBookmark,
  postWorkoutInfoBookmark,
  postWorkoutRecord,
} from '../../../apis/diary';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import CustomTimer from '../../../components/CustomTimer';
import DropdownModal from '../../../components/DropdownModal';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { BODY_FONT_SIZES, HEADER_FONT_SIZES } from '../../../constants/font';
import { FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../../constants/space';

const StartWorkout = () => {
  const navigation = useNavigation();

  const [exerciseListData, setExerciseListData] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [totalTime, setTotalTime] = useState({ minutes: 0, seconds: 0 });
  const [restTime, setRestTime] = useState({ minutes: 0, seconds: 0 });
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [dropdownState, setDropdownState] = useState({
    bodyPart: '전체',
    equipment: '전체',
    bookmark: false,
  });

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['80%', '80%'], []);

  /* eslint-disable */
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        // 운동 목록과 북마크 목록을 병렬로 요청하게 all메서르 사용
        const [exerciseRes, bookmarkRes] = await Promise.all([getExerciseList(), getWorkoutInfoBookmark()]);

        console.log('exerciseRes :>>', exerciseRes);
        console.log('bookmarkRes :>>', bookmarkRes);

        // bookmarkRes.data로 북마크 데이터를 추출하여 운동 목록과 결합
        const exerciseListWithBookmarks = exerciseRes.map((exercise) => {
          const isBookmarked = bookmarkRes.data.some((bookmark) => bookmark.workout_info_id === exercise.id);
          return { ...exercise, bookmark: isBookmarked };
        });

        setExerciseListData(exerciseListWithBookmarks);
      } catch (error) {
        console.log('무슨 error? : ', error);
      }
    };

    fetchExerciseData();
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);
  /* eslint-enable */

  const filteredExerciseList = useMemo(() => {
    return exerciseListData.filter((exercise) => {
      const isPartMatch = dropdownState.bodyPart === '전체' || exercise.body_part === dropdownState.bodyPart;
      const isToolMatch = dropdownState.equipment === '전체' || exercise.equipment === dropdownState.equipment;
      const isBookmarkMatch = dropdownState.bookmark ? exercise.bookmark === true : true;
      return isPartMatch && isToolMatch && isBookmarkMatch;
    });
  }, [exerciseListData, dropdownState.bodyPart, dropdownState.equipment, dropdownState.bookmark]);

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

  const handleSaveSelectedExercises = () => {
    const newWorkoutData = selectedExercises.map((exerciseName, index) => ({
      id: index + workoutData.length + 1,
      title: exerciseName,
      workoutSet: [{ id: 1, weight: '', reps: '' }],
      time: 0,
      isRunning: false,
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

  const handleRestTimer = () => {
    setIsTimerVisible(!isTimerVisible);
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
                  }
                  return workout;
                }),
              );
            }, 1000);
            setIntervalId(id);
            return { ...workout, isRunning: true };
          }
        }
        return workout;
      }),
    );
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const handleAddWorkoutSet = (workoutId) => {
    setWorkoutData((prevData) =>
      prevData.map((workout) => {
        if (workout.id === workoutId) {
          if (workout.workoutSet.length >= 10) {
            Alert.alert('알림', '세트는 최대 10개까지 추가할 수 있습니다.');
            return workout;
          } else {
            const maxSetId = workout.workoutSet.reduce((maxId, set) => Math.max(maxId, set.id), 0);
            return {
              ...workout,
              workoutSet: [...workout.workoutSet, { id: maxSetId + 1, weight: '', reps: '', isComplete: false }],
            };
          }
        }
        return workout;
      }),
    );
  };

  const handleDeleteWorkoutSet = (workoutId, setId) => {
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

  const handleCompleteWorkoutSet = (workoutId, setId) => {
    setWorkoutData(
      (prevData) =>
        prevData.map((workout) =>
          workout.id === workoutId
            ? /* eslint-disable */
              {
                ...workout,
                workoutSet: workout.workoutSet.filter((set) => set.id !== setId),
              }
            : workout,
        ),
      /* eslint-enable */
    );
  };

  const handleSaveWorkoutRecord = async () => {
    try {
      const title = '아침운동';
      const totalWorkoutTime = workoutData.reduce((total, workout) => total + workout.time, 0);

      const formatTotalTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      };
      const time = formatTotalTime(totalWorkoutTime);

      // 각 운동에 대해 완료된 세트만 필터링하여 workout_records 배열에 저장
      const workout_records = workoutData.flatMap((workout) =>
        workout.workoutSet
          .filter((set) => set.isComplete)
          .map((set) => ({
            workout_info: {
              name: workout.title,
            },
            weight: set.weight,
            reps: set.reps,
            set: set.id,
          })),
      );

      // 완료된 세트가 없는 경우 알림
      if (workout_records.length === 0) {
        Alert.alert('운동 기록', '완료된 세트가 없어 기록을 저장할 수 없습니다.');
        return;
      }

      // 운동 기록 객체 생성
      const workoutRecord = {
        title: title,
        time: time,
        workout_records, // 운동 기록 데이터
      };

      // POST 요청으로 운동 기록 저장
      const res = await postWorkoutRecord(workoutRecord);

      /* eslint-disable */
      // 응답 처리
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
    /* eslint enable */
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
        return acc;
      },
      { totalWorkoutTime: 0 },
    );
  };
  const { totalWorkoutTime } = calculateTotalTimes();

  const handleBookmarkToggle = async (workoutName, isBookMarked) => {
    console.log(workoutName, isBookMarked);
    try {
      // isBookMarked 값을 반전시켜 북마크 추가/삭제 결정
      const newBookmarkState = !isBookMarked;

      // 서버로 북마크 상태 전송 (workoutName과 새로운 북마크 상태 전달)
      const res = await postBookmark([{ name: workoutName, isBookMarked: newBookmarkState }]);

      if (res.status === 200) {
        // 응답이 성공적으로 오면 UI를 업데이트 (예: 북마크 상태 토글)
        setDropdownState((prev) => ({
          ...prev,
          bookmark: newBookmarkState, // 새로운 북마크 상태 반영
        }));

        // 사용자에게 알림
        showToast(`'${workoutName}'의 북마크가 ${newBookmarkState ? '추가' : '삭제'}되었습니다.`, 'success');
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
      showToast('북마크 처리에 실패했습니다.', 'error');
    }
  };

  const renderWorkoutCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.titleText}>{item.title}</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.startButton} onPress={() => handleStartPause(item.id)}>
            <Text style={styles.startButtonText}>{item.isRunning ? '정지' : '시작'}</Text>
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
        {item.workoutSet.map((set, index) => (
          <View key={set.id} style={styles.workoutSetRow}>
            <View style={styles.workoutSetInfo}>
              <Text style={styles.workoutSetText}>{index + 1}</Text>
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
                <TouchableOpacity onPress={() => handleCompleteWorkoutSet(item.id, set.id)}>
                  <MaterialCommunityIcons name="check-circle-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={() => handleDeleteWorkoutSet(item.id, set.id)}>
                <MaterialCommunityIcons name="minus-circle-outline" size={24} color={TEXT_COLORS.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addSetButton} onPress={() => handleAddWorkoutSet(item.id)}>
          <Text style={styles.addSetButtonText}>세트 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderExerciseList = ({ item }) => (
    <TouchableOpacity style={styles.exerciseItemContainer} onPress={() => handleExerciseSelect(item.name)}>
      <View style={styles.exerciseCheckboxContainer}>
        <MaterialCommunityIcons
          name={selectedExercises.includes(item.name) ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={24}
          color={COLORS.primary}
        />
      </View>
      <Text style={styles.exerciseItemText}>{item.name}</Text>
      <Text style={styles.exerciseItemText}>{item.bookmark}</Text>
      <TouchableOpacity onPress={() => handleBookmarkToggle(item.name, item.bookmark)}>
        <MaterialCommunityIcons
          name={item.bookmark ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color={item.bookmark ? COLORS.primary : TEXT_COLORS.secondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleSortChange = useCallback((key, value) => {
    setDropdownState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLORS.dark }}>
      <HeaderComponents title="운동 시작" icon="timer" onRightBtnPress={handleRestTimer} />
      <View style={styles.timerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="timer-outline" size={24} color={COLORS.white} />
          <Text style={styles.timerText}>운동: {formatTime(totalWorkoutTime)}</Text>
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

      <Modal visible={isTimerVisible} animationType="slide" transparent={true} onRequestClose={handleRestTimer}>
        <TouchableWithoutFeedback onPress={handleRestTimer}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>휴식시간</Text>
              <TouchableOpacity style={{ position: 'absolute', top: 10, right: 15 }} onPress={handleRestTimer}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <CustomTimer time={restTime} setTime={setRestTime} handleTimerVisible={handleRestTimer} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
                <DropdownModal
                  options={['전체', '상체', '하체', '팔', '등', '어깨', '가슴']}
                  onChange={(value) => handleSortChange('bodyPart', value)}
                  value={dropdownState.bodyPart}
                  placeholder={'부위'}
                  showIcon={true}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <DropdownModal
                  options={['전체', '바벨', '덤벨', '케틀벨', '머신']}
                  onChange={(value) => handleSortChange('equipment', value)}
                  value={dropdownState.equipment}
                  placeholder={'도구'}
                  showIcon={true}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginRight: 16,
                  backgroundColor: COLORS.darkGrey,
                  paddingVertical: SPACING.xxs,
                  paddingHorizontal: SPACING.sm,
                  borderRadius: RADIUS.large,
                }}
              >
                <MaterialCommunityIcons
                  name={dropdownState.bookmark ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                data={filteredExerciseList}
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
    fontFamily: FONTS.PRETENDARD[700],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleText: {
    fontSize: HEADER_FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
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
    fontFamily: FONTS.PRETENDARD[700],
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
    fontFamily: FONTS.PRETENDARD[500],
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
    fontFamily: FONTS.PRETENDARD[700],
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
    padding: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: HEADER_FONT_SIZES.md,
    color: TEXT_COLORS.primary,
    fontFamily: FONTS.PRETENDARD[700],
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
    fontFamily: FONTS.PRETENDARD[700],
  },

  exerciseHeader: {
    marginVertical: 16,
    color: TEXT_COLORS.primary,
    fontSize: HEADER_FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
  },
  timerText: {
    color: COLORS.white,
    marginLeft: 8,
    fontSize: BODY_FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
  },
});
