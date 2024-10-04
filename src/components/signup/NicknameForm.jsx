import React from 'react';
import { StyleSheet, View } from 'react-native';

import { FONT_SIZES } from '../../constants/font';
import useUserFormStore from '../../store/sign/signup';
import CustomInput from '../CustomInput';

const NicknameForm = () => {
  const { setNickName, nickname } = useUserFormStore();
  const handleNickNameInput = (text) => {
    setNickName(text);
  };
  return (
    <View style={styles.inputContainer}>
      <CustomInput
        size="large"
        theme="user"
        value={nickname}
        placeholder="닉네임을 입력해주세요"
        style={{ fontSize: FONT_SIZES.md }}
        onChangeText={handleNickNameInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    gap: 10,
  },
});

export default NicknameForm;
