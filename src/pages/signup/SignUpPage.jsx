import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import ProgressIndicator from '../../components/signup/ProgressIndicator';

const SignUpPage = () => {
  let test = '준영님 바보';
  var test1 = '창현님 바보';
  return (
    <SafeAreaView>
      <ProgressIndicator />
      <Text>Signup</Text>
    </SafeAreaView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({});
