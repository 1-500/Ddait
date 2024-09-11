import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import HeaderComponents from '../../components/HeaderComponents';
import SettingItem from '../../components/SettingItem';
import { COLORS } from '../../constants/colors';

const Setting = ({ navigation }) => {
  const [isPushOn, setIsPushOn] = useState(true); // 푸시 알림 기본값: On (임시)

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents title="설정" />
      <SettingItem
        title={'프로필 공개 범위'}
        description={'공개하면 친구 추천에 나타납니다'}
        rightBtn="arrow"
        onPress={() => navigation.navigate('ProfilePrivacy')}
      />
      <SettingItem
        title={'푸시알림'}
        description={isPushOn ? '따잇의 소식을 받아보고 있습니다' : '푸시 알림을 켜서 따잇의 소식을 받아보세요'}
        rightBtn="toggle"
        isToggled={isPushOn}
        onToggle={() => setIsPushOn(!isPushOn)}
      />
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
});
