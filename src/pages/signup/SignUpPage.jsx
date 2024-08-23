import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import CustomButton from '../../components/CustomButton';
import HeaderComponents from '../../components/HeaderComponents';
import BirthDayRegisterForm from '../../components/signup/BirthDayRegisterForm';
import EmailRegisterForm from '../../components/signup/EmailRegisterForm';
import GenderRegisterForm from '../../components/signup/GenderRegisterForm';
import MyPositionRegisterForm from '../../components/signup/MyPositionRegisterForm';
import NicknameRegisterForm from '../../components/signup/NicknameRegisterForm';
import PreferedSportRegisterForm from '../../components/signup/PreferedSportRegisterForm';
import StepIndicator from '../../components/StepIndicator';
import { BACKGROUND_COLORS } from '../../constants/colors';

const registrationForms = {
  1: {
    component: <EmailRegisterForm />,
    title: '이메일 회원가입',
  },
  2: {
    component: <NicknameRegisterForm />,
    title: '닉네임 입력',
  },
  3: {
    component: <BirthDayRegisterForm />,
    title: '생년월일 입력',
  },
  4: {
    component: <MyPositionRegisterForm />,
    title: '사용자 위치',
  },
  5: {
    component: <PreferedSportRegisterForm />,
    title: '선호 운동',
  },
  6: {
    component: <GenderRegisterForm />,
    title: '성별 선택',
  },
};

const SignUpPage = () => {
  const [step, setStep] = useState(1);

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleNextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents title={registrationForms[step].title} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <StepIndicator currentStep={step} steps={6} onPress={handleStepChange} />
          {registrationForms[step].component}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton theme="secondary" size="medium" text="이전" onPress={handlePrevStep} />
        <CustomButton theme="primary" size="medium" text="다음" onPress={handleNextStep} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.dark,
  },

  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: '10%',
    paddingBottom: '5%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
});

export default SignUpPage;
