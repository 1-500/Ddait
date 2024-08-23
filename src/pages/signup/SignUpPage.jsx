import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CustomButton from '../../components/CustomButton';
import BirthDayRegisterForm from '../../components/signup/BirthDayRegisterForm';
import EmailRegisterForm from '../../components/signup/EmailRegisterForm';
import GenderRegisterForm from '../../components/signup/GenderRegisterForm';
import MyPositionRegisterForm from '../../components/signup/MyPositionRegisterForm';
import NicknameRegisterForm from '../../components/signup/NicknameRegisterForm';
import PreferedSportRegisterForm from '../../components/signup/PreferedSportRegisterForm';
import StepIndicator from '../../components/StepIndicator';
import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';
import { FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../constants/font';
import { SPACING } from '../../constants/space';

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

  const navigation = useNavigation();
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
  const handleBackButton = () => {
    if (step !== 1) {
      handlePrevStep();
      return;
    }
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBackButton}>
            <FontAwesome name="angle-left" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{registrationForms[step].title}</Text>
          <Text style={{ width: 1 }} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <StepIndicator currentStep={step} steps={6} onPress={handleStepChange} />
            {registrationForms[step].component}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton theme="secondary" size="medium" text="바로 따잇 하러가기" />
          <CustomButton theme="primary" size="medium" text="다음" onPress={handleNextStep} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.dark,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    backgroundColor: COLORS.darkBackground,
  },
  headerText: {
    color: COLORS.white,
    fontSize: HEADER_FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
  },
  keyboardAvoidingView: {
    flex: 1,
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
