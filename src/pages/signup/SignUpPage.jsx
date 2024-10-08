import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { emailAccountId } from '../../apis/signup/index';
import CustomAlert from '../../components/CustomAlert';
import CustomButton from '../../components/CustomButton';
import HeaderComponents from '../../components/HeaderComponents';
import EmailForm from '../../components/signup/EmailForm';
import NicknameForm from '../../components/signup/NicknameForm';
import PasswordForm from '../../components/signup/PasswordForm';
import TosForm from '../../components/signup/TosForm';
import StepIndicator from '../../components/StepIndicator';
import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING } from '../../constants/space';
import useUserFormStore from '../../store/sign/signup';

const steps = [
  {
    step: 1,
    component: EmailForm,
    title: '따잇에서 사용할 \n이메일을 입력해 주세요',
    subTitle: '로그인에 사용될 정확한 이메일을 입력해주세요',
  },
  { step: 2, component: PasswordForm, title: '비밀번호를 입력하세요!' },
  {
    step: 3,
    component: NicknameForm,
    title: '어떻게 불러드릴까요?',
    subTitle: '앱에서 사용할 닉네임을 알려주세요.',
  },
  {
    step: 4,
    component: TosForm,
    title: '원활한 서비스 이용을 위해\n약관에 동의해주세요.',
    subTitle: '회원가입의 마지막단계입니다.',
  },
];

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigation = useNavigation();
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    onConfirm: null,
    showCancel: true,
  });

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const { email, password, nickname, tosAgreement, setTosAgreement } = useUserFormStore((state) => ({
    email: state.email,
    password: state.password,
    nickname: state.nickname,
    tosAgreement: state.tosAgreement,
    setTosAgreement: state.setTosAgreement,
  }));

  const currentStepData = steps.find((step) => step.step === currentStep);
  const CurrentStepComponent = currentStepData.component;

  const goToPrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleStepChange = (newStep) => setCurrentStep(newStep);

  const handleSubmit = async () => {
    try {
      const response = await emailAccountId({ email, password, nickname });

      if (response.status === 200) {
        navigation.navigate('Sign', { screen: 'Login' });
      }
    } catch (error) {
      setAlertConfig({
        visible: true,
        title: '오류 발생',
        message: error.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
        onConfirm: hideAlert,
        showCancel: false,
      });
    }
  };

  const handleTosSubmit = (agreement) => {
    setTosAgreement(agreement);
    goToNextStep();
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderComponents title="경쟁 생성하기" />

      <View style={styles.container}>
        <StepIndicator currentStep={currentStep} steps={steps.length} onPress={handleStepChange} />

        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>
            {typeof currentStepData.title === 'function' ? currentStepData.title(nickname) : currentStepData.title}
          </Text>
          {currentStepData.subTitle && <Text style={styles.subTitleText}>{currentStepData.subTitle}</Text>}
        </View>

        <CurrentStepComponent onSubmit={handleTosSubmit} />

        {currentStep < steps.length ? (
          <View style={styles.btnWrapper}>
            <CustomButton theme="secondary" size="medium" text="이전" onPress={goToPrevStep} />
            <CustomButton theme="primary" size="medium" text="다음" onPress={goToNextStep} />
          </View>
        ) : (
          <View style={styles.btnWrapper}>
            <CustomButton
              theme={tosAgreement ? 'primary' : 'block'}
              disabled={tosAgreement ? false : true}
              size="large"
              text="따잇 시작하기"
              onPress={handleSubmit}
            />
          </View>
        )}

        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          onConfirm={alertConfig.onConfirm}
          onCancel={hideAlert}
          showCancel={alertConfig.showCancel !== false}
          goBackOnConfirm={alertConfig.goBackOnConfirm}
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

export default SignUpPage;
