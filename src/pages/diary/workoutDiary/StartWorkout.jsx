import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomButton from '../../../components/CustomButton';
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
  const navigation = useNavigation();
  const [myCompetition, setMyCompetition] = useState('참여한 경쟁방 중 하나');
  const [hasWorkout, sethasWorkout] = useState(true);

  const handleStartWorkout = () => {};

  const renderWorkoutCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.titleText}>{item.title}</Text>
          <TouchableOpacity style={styles.startButton}>
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
          {item.workoutSet.map((set, index) => (
            <View key={set.id} style={styles.workoutSetRow}>
              <View style={styles.workoutSetInfo}>
                <Text style={styles.workoutSetText}>{index + 1}</Text>
                <Text style={styles.workoutSetText}>{set.weight} kg</Text>
                <Text style={styles.workoutSetText}>{set.reps} 회</Text>
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
  };

  const renderFooter = () => {
    return (
      <View style={{ marginVertical: 16 }}>
        <View style={{ marginBottom: 24 }}>
          <CustomButton
            theme="primary"
            size="large"
            states="enabled"
            onPress={handleStartWorkout}
            text="운동 추가하기"
          />
        </View>
        <CustomButton theme="secondary" size="large" states="enabled" onPress={() => {}} text="운동 완료" />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLORS.dark }}>
      <HeaderComponents title="운동 시작" icon="timer" />
      <View style={styles.timerContainer}>
        <MaterialCommunityIcons name="timer-outline" size={24} color={COLORS.white} />
        <Text style={{ color: COLORS.white, marginLeft: 16 }}>01:23</Text>
        {/* 타이머 컴포넌트 자리 */}
      </View>
      {hasWorkout ? (
        <FlatList
          data={dummyWorkoutData}
          renderItem={renderWorkoutCard}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.diaryContentContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>"{myCompetition}" 경쟁을 위해</Text>
            <Text style={styles.messageText}>오늘은 바벨스쿼트 먼저 해보는 건 어때요?</Text>
          </View>
          <CustomButton
            theme="primary"
            size="large"
            states="enabled"
            onPress={handleStartWorkout}
            text="운동 추가하기"
          />
        </View>
      )}
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
    backgroundColor: TEXT_COLORS.secondary,
    marginVertical: 8,
  },
  workoutSetContainer: {
    marginTop: 8,
  },
  workoutSetHeader: {
    flexDirection: 'row',
    gap: 64,
    marginBottom: 8,
  },
  workoutSetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  workoutSetInfo: {
    flexDirection: 'row',
    gap: 64,
  },
  workoutSetText: {
    color: TEXT_COLORS.primary,
    fontSize: BODY_FONT_SIZES.md,
  },
  addSetButton: {
    marginTop: 16,
    backgroundColor: COLORS.grey,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.medium,
  },
  addSetButtonText: {
    color: TEXT_COLORS.secondary,
    fontSize: BODY_FONT_SIZES.md,
  },
});
