import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import EmailRegisterForm from '../../components/signup/EmailRegisterForm';
import GenderRegisterForm from '../../components/signup/GenderRegisterForm';
import NicknameRegisterForm from '../../components/signup/NicknameRegisterForm';
import PreferedSportRegisterForm from '../../components/signup/PreferedSportRegisterForm';
import ProgressIndicator from '../../components/signup/ProgressIndicator';
const SignUpPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProgressIndicator />

        <NicknameRegisterForm />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonLeftColor]} activeOpacity={0.7}>
            <Text style={styles.buttonText}>바로 따잇하러 가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonRightColor]} activeOpacity={0.7}>
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  content: {
    paddingHorizontal: 20,
    marginVertical: 40,

    height: 580,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 148,
    height: 40,
    borderRadius: 12,
  },
  buttonLeftColor: {
    backgroundColor: '#13C670',
  },
  buttonRightColor: {
    backgroundColor: '#4C4CE8',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default SignUpPage;
