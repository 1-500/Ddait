import React from 'react';
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

import BirthDayRegisterForm from '../../components/signup/BirthDayRegisterForm';
import EmailRegisterForm from '../../components/signup/EmailRegisterForm';
import GenderRegisterForm from '../../components/signup/GenderRegisterForm';
import MyPositionRegisterForm from '../../components/signup/MyPositionRegisterForm';
import PreferedSportRegisterForm from '../../components/signup/PreferedSportRegisterForm';
import ProgressIndicator from '../../components/signup/ProgressIndicator';

const SignUpPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <ProgressIndicator />
            <MyPositionRegisterForm />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonLeftColor]} activeOpacity={0.7}>
            <Text style={styles.buttonText}>바로 따잇하러 가기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonRightColor]} activeOpacity={0.7}>
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
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
    backgroundColor: '#1C1C1C',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    paddingVertical: 12,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpPage;
