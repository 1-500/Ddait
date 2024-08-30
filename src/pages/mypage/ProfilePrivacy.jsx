import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import HeaderComponents from '../../components/HeaderComponents';
import SettingItem from '../../components/SettingItem';
import { COLORS } from '../../constants/colors';

const ProfilePrivacy = () => {
  // 기본값 : 전체공개 (임시))
  const [profileScope, setProfileScope] = useState('public');

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents title="공개 범위" />
      <SettingItem
        title={'전체 공개'}
        description={'모두가 내 프로필을 볼 수 있습니다'}
        leftBtn="radio"
        isRadioActive={profileScope === 'public'}
        onPress={() => setProfileScope('public')}
      />
      <SettingItem
        title={'친구만'}
        description={'친구만 내 프로필을 볼 수 있습니다'}
        leftBtn="radio"
        isRadioActive={profileScope === 'friends'}
        onPress={() => setProfileScope('friends')}
      />
      <SettingItem
        title={'나만 보기'}
        description={'암무도 내 일지를 볼 수 없습니다'}
        leftBtn="radio"
        isRadioActive={profileScope === 'private'}
        onPress={() => setProfileScope('private')}
      />
    </SafeAreaView>
  );
};

export default ProfilePrivacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
});
