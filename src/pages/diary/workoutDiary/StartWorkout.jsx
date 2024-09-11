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
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  getExerciseList,
  getWorkoutInfoBookmark,
  getWorkoutSearchResult,
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
import { debounce } from '../../../utils/foodDiary/debounce';

const StartWorkout = () => {
  const navigation = useNavigation();

  const [exerciseListData, setExerciseListData] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [totalTime, setTotalTime] = useState({ minutes: 0, seconds: 0 });
  const [restTime, setRestTime] = useState({ minutes: 0, seconds: 0 });
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [dropdownState, setDropdownState] = useState({
    bodyPart: '전체',
    equipment: '전체',
    bookmark: false,
  });
  const [workoutTitle, setWorkoutTitle] = useState('아침운동');
  const [editWorkoutTitle, setEditWorkoutTitle] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToastMessageStore();
  // const { competitionList } = useCompetitionStore.getState();
  const { competitionList } = useCompetitionStore();


  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['80%', '80%'], []);

  /* eslint-disable */
  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const [exerciseRes, bookmarkRes] = await Promise.all([getExerciseList(), getWorkoutInfoBookmark()]);

        const exerciseListWithBookmarks = exerciseRes.map((exercise) => {
          const isBookmarked = bookmarkRes.data.some((bookmark) => bookmark.workout_info_id === exercise.id);
          return { ...exercise, bookmark: isBookmarked };
        });
        
        if (searchTerm === '') {
          const [exerciseRes, bookmarkRes] = await Promise.all([getExerciseList(), getWorkoutInfoBookmark()]);
          const bookmarkedIds = bookmarkRes.data.map((bookmark) => bookmark.workout_info_id);
          const exerciseListWithBookmarks = exerciseRes.map((exercise) => {
            const isBookmarked = bookmarkedIds.includes(exercise.id);
            return { ...exercise, bookmark: isBookmarked };
          });

          setExerciseListData(exerciseListWithBookmarks);
        } else {
          const result = await getWorkoutSearchResult(searchTerm);
          setExerciseListData(result.data);
        }
      } catch (error) {
        console.log('무슨 error? : ', error);
      }
    };

    fetchExerciseData();
  }, [searchTerm]);

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
            clearInterval(intervalId);
            return { ...workout, isRunning: false };
          } else {
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

  /* eslint-disable */
  const handleCompleteWorkoutSet = (workoutId, setId) => {
    setWorkoutData((prevData) =>
      prevData.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              workoutSet: workout.workoutSet.map((set) => (set.id === setId ? { ...set, isComplete: true } : set)),
            }
          : workout,
      ),
    );
  };
  /* eslint-enable */

  /* eslint-disable */
  const updateCompetitionRecord = async () => {
    const today = new Date();
    try {
      const validCompetitions = competitionList.filter((competition) => {
        const startDate = new Date(competition.date.start_date);
        const endDate = new Date(competition.date.end_date);

        return competition.info.competition_theme === '3대측정내기' && startDate <= today && endDate >= today;
      });

      if (validCompetitions.length === 0) {
        showToast('경쟁 기록이 없습니다.', 'error', 1000, 'top', 80);
        return;
      }

      for (const competition of validCompetitions) {
        const competitionRoomId = competition.id;
        console.log('competitionRoomId :>>', competitionRoomId);
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

        if (workout_records.length === 0) {
          showToast('완료된 세트가 없어 기록을 저장할 수 없습니다.', 'error', 1000, 'top', 80);
          return;
        }

        const workoutRecord = {
          competition_room_id: competitionRoomId,
          // workout_records,
        };

        console.log('갱신할 roomid입니다 :>>', workoutRecord);

        const res = await patchCompetitionRecord(workoutRecord);

        if (res.status === 200) {
          showToast('경쟁 기록이 성공적으로 최신화되었습니다.', 'success', 1000, 'top', 80);
        } else {
          showToast('경쟁 기록 업데이트 실패.', 'error', 1000, 'top', 80);
        }
      }
    } catch (error) {
      console.error('경쟁 기록 업데이트 중 오류 발생:', error);
    }
  };
  /* eslint-enable */

  const handleSaveWorkoutRecord = async () => {
    try {
      const title = workoutTitle;
      const totalWorkoutTime = workoutData.reduce((total, workout) => total + workout.time, 0);

      const formatTotalTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      };
      const time = formatTotalTime(totalWorkoutTime);

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

      if (workout_records.length === 0) {
        Alert.alert('운동 기록', '완료된 세트가 없어 기록을 저장할 수 없습니다.');
        return;
      }

      const workoutRecord = {
        title: title,
        time: time,
        workout_records,
      };

      const res = await postWorkoutRecord(workoutRecord);

      /* eslint-disable */
      if (res) {
        Alert.alert('운동 기록', '정상적으로 저장되었습니다');
        navigation.navigate('DiaryMain');
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

  const handleBookmarkToggle = async (workoutId, isBookMarked) => {
    try {
      const newBookmarkState = !isBookMarked;
      const workoutData = { id: workoutId, isBookMarked: newBookmarkState };
      const res = await postWorkoutInfoBookmark(workoutData);
      console.log('서버 응답:', res);

      if (res.status === 200) {
        setExerciseListData((prevData) =>
          prevData.map((item) => (item.id === workoutId ? { ...item, bookmark: newBookmarkState } : item)),
        );
        console.log('UI 업데이트 후 운동 데이터:', exerciseListData);
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
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
      <TouchableOpacity onPress={() => handleBookmarkToggle(item.id, item.bookmark)}>
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


  const handleTitleChange = (text) => {
    setWorkoutTitle(text);
  };

  const handleSaveTitle = () => {
    setEditWorkoutTitle(false);
  }

  const debouncedSearch = debounce(async (term) => {
    try {
      const result = await getWorkoutSearchResult(term);
      setExerciseListData(result.data);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  }, 300);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm); // 검색어가 있을 때에만 호출
    }
  }, [searchTerm]);

  const handleSearchInput = (text) => {
    setSearchTerm(text); // 검색어 업데이트
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLORS.dark }}>
      <HeaderComponents title="운동 시작" icon="timer" onRightBtnPress={handleRestTimer} />

      <View style={styles.timerContainer}>
        {editWorkoutTitle ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              value={workoutTitle}
              onChangeText={handleTitleChange}
              style={styles.workoutTitleInput}
              onBlur={handleSaveTitle}
              autoFocus
            />
            <TouchableOpacity onPress={handleSaveTitle}>
              <MaterialCommunityIcons name="check" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => setEditWorkoutTitle(true)}
          >
            <Text style={styles.workoutTitle}>{workoutTitle}</Text>
            <MaterialCommunityIcons name="pencil-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        )}

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
        <BottomSheetModal ref={bottomSheetModalRef} enablePanDownToClose snapPoints={snapPoints}>
          <BottomSheetView style={styles.bottomSheetContainer}>
            <Text style={styles.exerciseHeader}>운동 추가</Text>
            <View>
              <CustomInput
                placeholder="하고자 하는 운동을 검색해보세요."
                theme="search"
                onChangeText={(text) => handleSearchInput(text)}
              />
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
                onPress={() => handleSortChange('bookmark', !dropdownState.bookmark)}
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
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
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
  workoutTitle: {
    color: COLORS.white,
    marginRight: 8,
    fontSize: BODY_FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
  },
  workoutTitleInput: {
    color: COLORS.white,
    marginRight: 8,
    fontSize: BODY_FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
  },
});
