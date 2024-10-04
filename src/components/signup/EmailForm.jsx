import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import useUserFormStore from '../../store/sign/signup';
import { validateEmail } from '../../utils/validate';
import CustomInput from '../CustomInput';

const EmailForm = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { email, setEmail } = useUserFormStore();

  const handleEmailInput = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  return (
    <View style={styles.inputContainer}>
      <CustomInput
        size="large"
        theme="user"
        placeholder="이메일을 입력해주세요"
        style={{ fontSize: FONT_SIZES.md }}
        onChangeText={handleEmailInput}
        value={email}
      />
      {!isEmailValid && <Text style={styles.errorMsg}>이메일 형식이 올바르지 않습니다. </Text>}
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

export default EmailForm;
