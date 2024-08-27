import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { createCompetition } from '../../../apis/competition/index';
import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import StepIndicator from '../../../components/StepIndicator';
import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../../constants/font';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING } from '../../../constants/space';
import useCreateRoomStateStore from '../../../store/competition/index';
import { formatDate_ISO8601 } from '../../../utils/date';
import SetRoomDetail from '../CompetitionCreation/SetRoomDetail';
import SetRoomTitle from '../CompetitionCreation/SetRoomTitle';
import SetSportsCategory from '../CompetitionCreation/SetSportsCategory';
import SetTheme from '../CompetitionCreation/SetTheme';
import SetDetailTheme from './SetDetailTheme';

const steps = [
  { step: 1, component: SetRoomTitle, description: '어떤 경쟁을 하고 싶나요?' },
  { step: 2, component: SetSportsCategory, description: '원하는 운동 카테고리를 선택하세요.' },
  { step: 3, component: SetTheme, description: '테마를 선택하세요.' },
  { step: 4, component: SetRoomDetail, description: '세부 사항들을 설정해주세요.' },
  { step: 5, component: SetDetailTheme, description: '상세테마를 선택하세요.' },
];

const CompetitionCreation = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    title,
    maxMembers,
    competitionType,
    competitionTheme,
    theme,
    startDate,
    endDate,
    isPrivate,
    hasSmartWatch,
    resetState,
  } = useCreateRoomStateStore();

  const currentStepData = steps.find((step) => step.step === currentStep);
  const CurrentStepComponent = currentStepData.component;

  useEffect(() => {
    const hasExistingData =
      title ||
      maxMembers ||
      competitionType ||
      competitionTheme ||
      startDate.year ||
      endDate.year ||
      isPrivate ||
      hasSmartWatch;

    if (hasExistingData) {
      Alert.alert('생성중이던 방이 있어요.', '생성중이던 방 정보를 불러올까요?', [
        {
          text: '네, 불러올게요',
        },
        {
          text: '아니요 초기화할래요.',
          onPress: () => resetState(),
          style: 'destructive',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToPrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleStepChange = (newStep) => setCurrentStep(newStep);

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!title;
      case 2:
        return !!competitionType;
      case 3:
        return !!theme;
      case 4:
        return (
          maxMembers > 0 &&
          isPrivate &&
          hasSmartWatch &&
          startDate.year &&
          startDate.month &&
          startDate.day &&
          endDate.year &&
          endDate.month &&
          endDate.day
        );
      case 5:
        return !!competitionTheme;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid()) {
      Alert.alert('경고', '모든 항목을 기입해야 경쟁방을 생성할 수 있어요.');
      return;
    }
    const data = {
      title,
      max_members: maxMembers,
      competition_type: competitionType,
      competition_theme: competitionTheme,
      start_date: formatDate_ISO8601(startDate),
      end_date: formatDate_ISO8601(endDate, true),
      is_private: isPrivate,
      smartwatch: hasSmartWatch,
    };

    try {
      const response = await createCompetition(data);
      Alert.alert('경쟁방 생성', `'${title}' 경쟁방이 생성되었습니다!`);
      maxMembers === 2
        ? navigation.navigate('CompetitionRoom1V1', { competitionId: response.room_id })
        : navigation.navigate('CompetitionRoomRanking', { competitionId: response.room_id });
      resetState();
    } catch (error) {
      Alert.alert('Error', 'Failed to create competition');
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderComponents title="경쟁 생성하기" />
      <View style={styles.container}>
        <StepIndicator currentStep={currentStep} steps={steps.length} onPress={handleStepChange} />
        <Text style={styles.stepText}>
          {currentStep}. {currentStepData.description}
        </Text>
        <CurrentStepComponent />
        <View style={styles.btnWrapper}>
          <CustomButton
            theme={currentStep === 1 ? 'block' : 'primary'}
            size="medium"
            text="이전"
            onPress={goToPrevStep}
          />
          {currentStep === steps.length ? (
            <CustomButton theme="secondary" size="medium" text="경쟁방 생성" onPress={handleSubmit} />
          ) : (
            <CustomButton theme="primary" size="medium" text="다음" onPress={goToNextStep} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.dark,
  },
  container: {
    flex: 1,
    ...LAYOUT_PADDING,
    ...ELEMENT_VERTICAL_MARGIN,
  },
  stepText: {
    fontSize: HEADER_FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: 'Pretendard',
    color: COLORS.white,
    marginVertical: 28,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: 10,
  },
});

export default CompetitionCreation;
