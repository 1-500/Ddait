import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, BUTTON_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';

const StartWorkout = () => {
  const navigation = useNavigation();
  const [myCompetition, setMyCompetition] = useState('참여한 경쟁방 중 하나');
  const [hasWorkout, sethasWorkout] = useState(false);
  const handleStartWorkout = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <View style={{ height: 60, backgroundColor: '#fff' }}>
        <HeaderComponents title="운동 시작" />
      </View>
      <View style={{ height: 60, backgroundColor: '#666' }}>
        <Text>타이머 컨포넌트</Text>
      </View>
      {hasWorkout ? (
        <View style={styles.diaryContentContainer}>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>오늘 운동이 있음</Text>
          </View>

          <CustomButton
            theme="primary"
            size="large"
            states="enabled"
            onPress={handleStartWorkout}
            text="운동 추가하기"
          />
        </View>
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
  diaryContentContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    height: '100%',
    ...LAYOUT_PADDING,
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
