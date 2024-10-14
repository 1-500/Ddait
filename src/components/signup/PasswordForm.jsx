import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import useUserFormStore from '../../store/sign/signup';
import CustomInput from '../CustomInput';

const PasswordForm = () => {
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const { password, setPassword } = useUserFormStore();

  const handlePasswordInput = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordInput = (text) => {
    return text !== password ? setIsConfirmPasswordValid(false) : setIsConfirmPasswordValid(true);
  };

  return (
    <View style={styles.inputContainer}>
      <CustomInput
        size="large"
        theme="user"
        value={password}
        placeholder="비밀번호를 입력해주세요"
        secureTextEntry={true}
        style={{ fontSize: FONT_SIZES.md }}
        onChangeText={handlePasswordInput}
      />
      <CustomInput
        size="large"
        theme="user"
        placeholder="비밀번호 확인"
        secureTextEntry={true}
        style={{ fontSize: FONT_SIZES.md }}
        onChangeText={handleConfirmPasswordInput}
      />
      {!isConfirmPasswordValid && <Text style={styles.errorMsg}> 비밀번호가 일치하지 않습니다. </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  errorMsg: {
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.red,
    fontSize: FONT_SIZES.xs,
    paddingLeft: 10,
  },
});

export default PasswordForm;
