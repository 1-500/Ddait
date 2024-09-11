import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { postLogout } from '../../apis/mypage/index';
import CustomAlert from '../../components/CustomAlert';
import CustomButton from '../../components/CustomButton';
import CustomTag from '../../components/CustomTag';
import HeaderComponents from '../../components/HeaderComponents';
import SettingItem from '../../components/SettingItem';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';
import useUserStore from '../../store/sign/login';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';

const defaultBadge = require('../../assets/images/badge-default.png');
const defaultProfile = require('../../assets/images/default-profile.png');

const MyPage = ({ navigation }) => {
  // 임시 뱃지 배열
  const badges = [defaultBadge, defaultBadge, defaultBadge, defaultBadge, defaultBadge];
  const { clearUser, nickname, userEmail, introduce, profileImageUrl } = useUserStore();
  const { showToast } = useToastMessageStore();
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    onConfirm: null,
    showCancel: true,
  });

  const showAlert = (config) => {
    setAlertConfig({ ...config, visible: true });
  };

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const handleLogoutButton = () => {
    showAlert({
      title: '로그아웃',
      message: '정말 로그아웃 하시겠어요?\n다음에 또 만나요! 👋 ',
      onConfirm: async () => {
        try {
          const result = await postLogout();
          if (result.status === 200) {
            clearUser();
            hideAlert();
            showToast('👋 로그아웃 되었습니다. 다음에 또 봐요!', 'success', 3000, 'top');
            navigation.navigate('Sign', {
              screen: 'Login',
            });
          } else {
            throw new Error('Logout failed');
          }
        } catch (error) {
          hideAlert();
          showToast('🚫 로그아웃에 실패했어요. 다시 시도해 주세요!', 'error', 3000, 'top');
        }
      },
      onCancel: hideAlert,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents icon="setting" title="마이페이지" onRightBtnPress={() => navigation.navigate('Setting')} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}>
        {/* 프로필 정보 */}
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: 'row', gap: SPACING.md }}>
            <Image source={profileImageUrl ? { uri: profileImageUrl } : defaultProfile} style={styles.profileImg} />
            <View style={{ flexShrink: 1, gap: 6 }}>
              <Text style={styles.nameText}>{nickname}</Text>
              <Text style={styles.emailText}>{userEmail}</Text>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <CustomTag size="small" text="웨이트" />
                <CustomTag size="small" text="다이어트" />
              </View>
              <Text style={styles.introduceText} numberOfLines={1} ellipsizeMode="tail">
                {introduce || '따잇에서 나를 소개해볼까요? 👋'}
              </Text>
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <CustomButton
              theme="primary"
              size="medium"
              text="회원 정보 수정"
              onPress={() => navigation.navigate('ProfileEdit')}
            />
            <CustomButton theme="error" size="medium" text="로그아웃" onPress={handleLogoutButton} />
          </View>
        </View>

        {/* 뱃지 */}
        <View style={styles.badgeContainer}>
          <View style={styles.badgeTitleWrapper}>
            <Text style={styles.subTitle}>획득한 뱃지</Text>
            <TouchableOpacity
              onPress={() => showToast('아직 준비 중인 기능이에요! 💪', 'error', 2000, 'bottom')}
              activeOpacity={0.6}
            >
              <Text style={styles.seeMore}>더보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.badgeWrapper}>
            {badges.map((badge, index) => (
              <Image key={index} source={defaultBadge} style={{ width: 50, height: 50 }} />
            ))}
          </View>
        </View>

        {/* 나의 기록 */}
        <View>
          <Text style={[styles.subTitle, styles.settingTitle]}>나의 기록</Text>
          <View style={styles.divider} />
          <SettingItem
            title={'경쟁 내역'}
            description={'종료된 경쟁 결과 보기'}
            rightBtn="arrow"
            onPress={() => showToast('아직 준비 중인 기능이에요! 💪', 'error', 2000, 'bottom')}
          />
          <SettingItem
            title={'운동 기록 통계'}
            description={'운동 통계 데이터 보기'}
            rightBtn="arrow"
            onPress={() => showToast('아직 준비 중인 기능이에요! 💪', 'error', 2000, 'bottom')}
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
            onPress={() => showToast('아직 준비 중인 기능이에요! 💪', 'error', 2000, 'bottom')}
          />
        </View>
      </ScrollView>
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={alertConfig.onConfirm}
        onCancel={hideAlert}
        showCancel={alertConfig.showCancel !== false}
      />
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
