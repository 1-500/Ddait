import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
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

import CustomTag from '../../../../src/components/CustomTag';
import { getExerciseList } from '../../../apis/diary';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import CustomTimer from '../../../components/CustomTimer';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { BODY_FONT_SIZES, FONT_SIZES, HEADER_FONT_SIZES } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';

const StartWorkout = () => {
  const [exerciseListData, setExerciseListData] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['80%', '80%'], []);

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

  const handleStartWorkout = () => {
    // console.log('모달등장');
  };

  const renderWorkoutCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.titleText}>{item.title}</Text>
        <TouchableOpacity style={styles.startButton} onPress={handleTimerVisible}>
          <Text style={styles.startButtonText}>시작</Text>
        </TouchableOpacity>
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
              <TouchableOpacity>
                <MaterialCommunityIcons name="check-circle-outline" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="minus-circle-outline" size={24} color={TEXT_COLORS.secondary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addSetButton}>
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
      <HeaderComponents title="운동 시작" icon="timer" onRightBtnPress={handleTimerVisible} />
      <View style={styles.timerContainer}>
        <MaterialCommunityIcons name="timer-outline" size={24} color={COLORS.white} />
        <Text style={{ color: COLORS.white, marginLeft: 16 }}>
          {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
        </Text>
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
              onPress={handleStartWorkout}
              text="운동 완료"
            />
          </View>
        }
      />

      <Modal visible={isTimerVisible} animationType="slide" transparent={true} onRequestClose={handleTimerVisible}>
        <TouchableWithoutFeedback onPress={handleTimerVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>타이머</Text>
              <TouchableOpacity style={{ position: 'absolute', top: 10, right: 15 }} onPress={handleTimerVisible}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <CustomTimer time={time} setTime={setTime} handleTimerVisible={handleTimerVisible} />
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
                <CustomTag size="big" text="부위" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <CustomTag size="big" text="무게" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 16 }}>
                <CustomTag size="big" text="도구" />
              </TouchableOpacity>
            </View>
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
