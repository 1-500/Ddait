import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../../components/CustomButton';

const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>HomePage</Text>
        <CustomButton theme="primary" size="medium" text="Press me" />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
