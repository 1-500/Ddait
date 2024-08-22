import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SignUpInput from './SignUpInput';

const EmailRegisterForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>나라짱짱님의 이메일과 비밀번호를 알려주세요!</Text>
        <Text style={styles.subHeaderText}>이메일 로그인에 사용되어집니다.</Text>
      </View>

      <View style={styles.inputContainer}>
        <SignUpInput placeholder="이메일을 입력해주세요" />
        <SignUpInput placeholder="비밀번호를 입력해주세요" />
        <SignUpInput placeholder="비밀번호 확인" />
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
