import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import StepIndicator from '../../../components/StepIndicator';
import TemporaryHeader from '../TemporaryHeader';

const CreateCompetition = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TemporaryHeader title={'경쟁 생성하기'} />
      <View style={styles.container}>
        <StepIndicator currentStep={1} steps={5} />
        <Text style={styles.stepText}>1. 어떤 경쟁을 하고 싶나요?</Text>
        <TextInput style={styles.input} placeholder="경쟁방 이름을 입력하세요." placeholderTextColor="#888" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  container: {
    padding: 20,
  },
  stepText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#e0e0e0',
    marginVertical: 20,
  },
  input: {
    borderRadius: 16,
    borderColor: '#5d5dfc',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
    color: '#e0e0e0',
  },
});

export default CreateCompetition;
