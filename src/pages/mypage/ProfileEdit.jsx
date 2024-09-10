import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';

const ProfileEdit = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents title="회원 정보 수정" />
      <Text>회원 정보 수정 페이지</Text>
    </SafeAreaView>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
});
