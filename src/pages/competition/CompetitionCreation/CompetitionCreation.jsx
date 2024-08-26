import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import StepIndicator from '../../../components/StepIndicator';
import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../../constants/font';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING } from '../../../constants/space';
import SetRoomDetail from '../CompetitionCreation/SetRoomDetail';
import SetRoomTitle from '../CompetitionCreation/SetRoomTitle';
import SetSportsCategory from '../CompetitionCreation/SetSportsCategory';
import SetTheme from '../CompetitionCreation/SetTheme';
import SetDetailTheme from './SetDetailTheme';

const stepDescriptionList = [
  { step: 1, description: '어떤 경쟁을 하고 싶나요?' },
  { step: 2, description: '원하는 운동 카테고리를 선택하세요.' },
  { step: 3, description: '세부 사항들을 설정해주세요.' },
  { step: 4, description: '테마를 선택하세요.' },
  { step: 5, description: '상세테마를 선택하세요.' },
];

const CompetitionCreation = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleStepChange = (newStep) => {
    setStep(newStep);
  };
  const handleSubmit = () => {
    alert('경쟁방이 생성되었습니다!');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderComponents title={'경쟁 생성하기'} />
      <View style={[LAYOUT_PADDING, ELEMENT_VERTICAL_MARGIN, styles.container]}>
        <StepIndicator currentStep={step} steps={5} onPress={handleStepChange} />
        <Text style={[styles.stepText, ELEMENT_VERTICAL_MARGIN]}>
          {step}. {stepDescriptionList.find((item) => item.step === step).description}
        </Text>
        {step === 1 && <SetRoomTitle />}
        {step === 2 && <SetSportsCategory />}
        {step === 3 && <SetRoomDetail />}
        {step === 4 && <SetTheme />}
        {step === 5 && <SetDetailTheme />}
        <View style={styles.btnWrapper}>
          <CustomButton theme="primary" size="medium" text="이전" onPress={handlePrevStep} />
          {step === 5 ? (
            <CustomButton theme="secondary" size="medium" text="경쟁방 생성" onPress={handleSubmit} />
          ) : (
            <CustomButton theme="primary" size="medium" text="다음" onPress={handleNextStep} />
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
