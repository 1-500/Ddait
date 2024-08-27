import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { createCompetition } from '../../../apis/competition/index';
import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import StepIndicator from '../../../components/StepIndicator';
import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../../constants/font';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING } from '../../../constants/space';
import useCreateRoomStateStore from '../../../store/competition/index';
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

const CompetitionCreation = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const { title, maxMembers, competitionType, competitionTheme, startDate, endDate, isPrivate, hasSmartWatch } =
    useCreateRoomStateStore((state) => ({
      title: state.title,
      maxMembers: state.maxMembers,
      competitionType: state.competitionType,
      competitionTheme: state.competitionTheme,
      startDate: state.startDate,
      endDate: state.endDate,
      isPrivate: state.isPrivate,
      hasSmartWatch: state.hasSmartWatch,
    }));

  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const goToPrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleStepChange = (newStep) => setCurrentStep(newStep);

  const handleSubmit = async () => {
    const data = {
      title,
      max_members: maxMembers,
      competition_type: competitionType,
      competition_theme: competitionTheme,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate, true),
      is_private: isPrivate,
      smartwatch: hasSmartWatch,
    };

    try {
      await createCompetition(data);
      Alert.alert('경쟁방 생성', `'${title}' 경쟁방이 생성되었습니다!`);
    } catch (error) {
      Alert.alert('Error', 'Failed to create competition');
    }
  };

  const formatDate = (date, isEnd = false) => {
    const dayTime = isEnd ? '23:59:59' : '00:00:00';
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}T${dayTime}Z`;
  };

  const currentStepData = steps.find((step) => step.step === currentStep);
  const CurrentStepComponent = currentStepData.component;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderComponents title="경쟁 생성하기" />
      <View style={[LAYOUT_PADDING, ELEMENT_VERTICAL_MARGIN, styles.container]}>
        <StepIndicator currentStep={currentStep} steps={steps.length} onPress={handleStepChange} />
        <Text style={[styles.stepText, ELEMENT_VERTICAL_MARGIN]}>
          {currentStep}. {currentStepData.description}
        </Text>
        <CurrentStepComponent />
        <View style={styles.btnWrapper}>
          <CustomButton theme="primary" size="medium" text="이전" onPress={goToPrevStep} />
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
  },
  stepText: {
    fontSize: HEADER_FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: 'Pretendard',
    color: COLORS.white,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: 10,
  },
});

export default CompetitionCreation;
