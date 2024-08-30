import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { postLogout } from '../../apis/mypage/index';
import CustomButton from '../../components/CustomButton';
import CustomTag from '../../components/CustomTag';
import HeaderComponents from '../../components/HeaderComponents';
import SettingItem from '../../components/SettingItem';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { LAYOUT_PADDING } from '../../constants/space';
import { SPACING } from '../../constants/space';

const dummyProfile = require('../../assets/images/profile.png');
const defaultBadge = require('../../assets/images/badge-default.png');

const MyPage = ({ navigation }) => {
  // 임시 뱃지 배열
  const badges = [defaultBadge, defaultBadge, defaultBadge, defaultBadge, defaultBadge];
  // 푸시 알림 기본값: On (임시)
  const [isPushOn, setIsPushOn] = useState(true);

  const handleLogoutButton = async () => {
    const result = await postLogout();
    if (result.status === 200) {
      Alert.alert('로그아웃 하였습니다!');
      navigation.navigate('Sign', {
        screen: 'Login',
      });
    } else {
      Alert.alert('로그아웃 실패하였습니다');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents icon="setting" title="마이페이지" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}>
        {/* 프로필 정보 */}
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: 'row', gap: SPACING.md }}>
            <Image source={dummyProfile} style={styles.profileImg} />
            <View style={{ gap: 6 }}>
              <Text style={styles.nameText}>따잇</Text>
              <Text style={styles.emailText}>testemail@gmail.com</Text>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <CustomTag size="small" text="웨이트" />
                <CustomTag size="small" text="다이어트" />
              </View>
              <Text style={styles.introduceText}>소개글입니다</Text>
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <CustomButton theme="primary" size="medium" text="회원 정보 수정" />
            <CustomButton theme="primary" size="medium" text="로그아웃" onPress={handleLogoutButton} />
          </View>
        </View>

        {/* 뱃지 */}
        <View style={styles.badgeContainer}>
          <View style={styles.badgeTitleWrapper}>
            <Text style={styles.subTitle}>획득한 뱃지</Text>
            <TouchableOpacity onPress={() => Alert.alert('뱃지 상세 페이지로 이동')} activeOpacity={0.6}>
              <Text style={styles.seeMore}>더보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badgeWrapper}>
            {badges.map((badge, index) => (
              <Image source={defaultBadge} style={{ width: 50, height: 50 }} />
            ))}
          </View>
        </View>

        {/* 설정 메뉴 */}
        <View>
          <Text style={[styles.subTitle, styles.settingTitle]}>설정</Text>
          <View style={styles.divider} />
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
          <SettingItem
            title={'운동 기록 통계'}
            description={'운동 통계 데이터 보기'}
            rightBtn="arrow"
            onPress={() => Alert.alert('운동 기록 통계 페이지로 이동')}
          />
        </View>

        {/* 도움말 */}
        <View>
          <Text style={[styles.subTitle, styles.settingTitle]}>도움말</Text>
          <View style={styles.divider} />
          <SettingItem
            title={'FAQ'}
            description={'자주 묻는 질문'}
            rightBtn="arrow"
            onPress={() => Alert.alert('FAQ 페이지로 이동')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  profileContainer: {
    ...LAYOUT_PADDING,
    marginTop: SPACING.lg,
  },
  profileImg: {
    width: 100,
    height: 100,
  },
  nameText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[600],
  },
  emailText: {
    color: COLORS.semiLightGrey,
    fontFamily: FONTS.PRETENDARD[400],
  },
  introduceText: {
    color: COLORS.white,
    marginTop: 2,
    fontFamily: FONTS.PRETENDARD[400],
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginVertical: SPACING.lg,
  },
  badgeContainer: {
    ...LAYOUT_PADDING,
    paddingTop: SPACING.xl,
    borderTopWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  badgeTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  subTitle: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
  },
  seeMore: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.PRETENDARD[500],
  },
  badgeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginTop: SPACING.lg,
    backgroundColor: COLORS.darkGrey,
    padding: SPACING.md,
    borderRadius: SPACING.md,
  },
  settingTitle: {
    marginTop: 30,
    marginLeft: SPACING.lg,
    marginBottom: SPACING.md,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: COLORS.darkGrey,
  },
});
