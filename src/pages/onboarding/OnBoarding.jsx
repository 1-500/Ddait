import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { postOnboarding } from '../../apis/onboarding';
import CustomAlert from '../../components/CustomAlert';
import CustomButton from '../../components/CustomButton';
import HeaderComponents from '../../components/HeaderComponents';
import BirthDayRegisterForm from '../../components/onboarding/BirthForm';
import GenderRegisterForm from '../../components/onboarding/GenderForm';
import MyPositionRegisterForm from '../../components/onboarding/MyPositionMap';
import PreferedSportRegisterForm from '../../components/onboarding/PreferedSportForm';
import StepIndicator from '../../components/StepIndicator';
import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING } from '../../constants/space';
import useUserFormStore from '../../store/sign/signup';

const steps = [
  {
    step: 1,
    component: PreferedSportRegisterForm,
    title: '좋아하는 운동을 선택해주세요',
    subTitle: '따잇에서 함께 즐길 운동을 알려주세요.',
  },
  {
    step: 2,
    component: MyPositionRegisterForm,
    title: '나의 위치를 설정해주세요.',
    subTitle: '함께 운동할 친구들을 찾을 수 있어요.',
  },
  {
    step: 3,
    component: GenderRegisterForm,
    title: '성별을 선택해주세요.',
    subTitle: '맞춤형 운동 추천을 위해 필요합니다.',
  },
  {
    step: 4,
    component: BirthDayRegisterForm,
    title: '생일을 알려주세요!',
    subTitle: '필수 정보는 아니에요.',
  },
];

const OnBoarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigation = useNavigation();
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    onConfirm: null,
    showCancel: true,
  });

  const { preferredSport, position, gender, selectedDate } = useUserFormStore();
  const showAlert = (config) => {
    setAlertConfig({ ...config, visible: true });
  };
  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const currentStepData = steps.find((step) => step.step === currentStep);
  const CurrentStepComponent = currentStepData.component;

  const goToPrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleStepChange = (newStep) => setCurrentStep(newStep);

  const handleSubmit = async () => {
    const { day, month, year } = selectedDate;
    const birthdate = new Date(`${year}-${month}-${day}`);
    const positionString = `${position.latitude},${position.longitude}`;
    try {
      const res = await postOnboarding({
        preferredSport,
        location: positionString,
        gender,
        birthdate,
      });
      if (res.status === 200) {
        navigation.navigate('MainTab', { screen: 'Home' });
      }
    } catch (error) {
      showAlert({
        visible: true,
        title: '오류 발생',
        message: error.message || '정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.',
        onConfirm: hideAlert,
        showCancel: false,
      });
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderComponents title="온보딩" />

      <View style={styles.container}>
        <StepIndicator currentStep={currentStep} steps={steps.length} onPress={handleStepChange} />

        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{currentStepData.title}</Text>
          {currentStepData.subTitle && <Text style={styles.subTitleText}>{currentStepData.subTitle}</Text>}
        </View>

        <CurrentStepComponent />

        {currentStep < steps.length ? (
          <View style={styles.btnWrapper}>
            <CustomButton theme="secondary" size="medium" text="이전" onPress={goToPrevStep} />
            <CustomButton theme="primary" size="medium" text="다음" onPress={goToNextStep} />
          </View>
        ) : (
          <View style={styles.btnWrapper}>
            <CustomButton theme="primary" size="large" text="따잇 시작하기" onPress={handleSubmit} />
          </View>
        )}

        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          onConfirm={alertConfig.onConfirm}
          onCancel={hideAlert}
          showCancel={alertConfig.showCancel !== false}
        />
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
  headerContainer: {
    marginVertical: 28,
    gap: 10,
  },
  titleText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.PRETENDARD[500],
  },
  subTitleText: {
    color: COLORS.semiLightGrey,
    fontSize: 16,
    fontFamily: FONTS.PRETENDARD[400],
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: 10,
  },
});

export default OnBoarding;
