import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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

import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import CustomTimer from '../../../components/CustomTimer';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { BODY_FONT_SIZES, HEADER_FONT_SIZES } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';

const dummyWorkoutData = [
  {
    id: '1',
    title: '바벨 스쿼트',
    workoutSet: [
      {
        id: '1',
        weight: 20,
        reps: 10,
      },
      {
        id: '2',
        weight: 40,
        reps: 10,
      },
      {
        id: '3',
        weight: 60,
        reps: 10,
      },
    ],
  },
  {
    id: '2',
    title: '레그 프레스',
    workoutSet: [
      {
        id: '1',
        weight: 20,
        reps: 10,
      },
      {
        id: '2',
        weight: 40,
        reps: 10,
      },
      {
        id: '3',
        weight: 60,
        reps: 10,
      },
    ],
  },
];

const StartWorkout = () => {
  const [workoutData, setWorkoutData] = useState([
    {
      id: '1',
      title: '바벨 스쿼트',
      workoutSet: [
        { id: '1', weight: '20', reps: '10' },
        { id: '2', weight: '40', reps: '10' },
        { id: '3', weight: '60', reps: '10' },
      ],
    },
    {
      id: '2',
      title: '레그 프레스',
      workoutSet: [
        { id: '1', weight: '20', reps: '10' },
        { id: '2', weight: '40', reps: '10' },
        { id: '3', weight: '60', reps: '10' },
      ],
    },
  ]);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const handleTimerVisible = () => {
    setIsTimerVisible(!isTimerVisible);
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
              <MaterialCommunityIcons name="check-circle-outline" size={24} color={COLORS.primary} />
              <MaterialCommunityIcons name="minus-circle-outline" size={24} color={TEXT_COLORS.secondary} />
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.addSetButton}>
          <Text style={styles.addSetButtonText}>세트 추가</Text>
        </TouchableOpacity>
      </View>
    </View>
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
      <FlatList
        data={workoutData}
        renderItem={renderWorkoutCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
        keyExtractor={(item) => item.id}
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
});
