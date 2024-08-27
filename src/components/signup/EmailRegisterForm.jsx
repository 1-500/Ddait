import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import CustomInput from '../../components/CustomInput';
import { FONT_SIZES } from '../../constants/font';
import useUserFormStore from '../../store/sign/signup';
import { validateEmail } from '../../utils/validate';

const EmailRegisterForm = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const { email, setEmail, password, setPassword } = useUserFormStore();

  const handleEmailInput = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const handlePasswordInput = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordInput = (text) => {
    return text !== password ? setIsConfirmPasswordValid(false) : setIsConfirmPasswordValid(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>이메일과 비밀번호를 알려주세요!</Text>
        <Text style={styles.subHeaderText}>이메일 로그인에 사용되어집니다.</Text>
      </View>

      <View style={styles.inputContainer}>
        <View>
          <CustomInput
            size="large"
            theme="user"
            placeholder="이메일을 입력해주세요"
            style={{ fontSize: FONT_SIZES.md }}
            onChangeText={handleEmailInput}
            value={email}
          />
          {!isEmailValid && (
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: FONT_SIZES.xs, color: 'red' }}>이메일 형식이 올바르지 않습니다. </Text>
            </View>
          )}
        </View>
        <View>
          <CustomInput
            size="large"
            theme="user"
            value={password}
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={true}
            style={{ fontSize: FONT_SIZES.md }}
            onChangeText={handlePasswordInput}
          />
        </View>
        <View>
          <CustomInput
            size="large"
            theme="user"
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            style={{ fontSize: FONT_SIZES.md }}
            onChangeText={handleConfirmPasswordInput}
          />
          {!isConfirmPasswordValid && (
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: FONT_SIZES.xs, color: 'red' }}>비밀번호가 일치하지 않습니다. </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  subHeaderText: {
    color: '#D9D9D9',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 16,
    marginTop: 30,
    marginBottom: 30,
  },
});

export default EmailRegisterForm;
