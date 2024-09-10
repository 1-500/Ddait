import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import CustomAlert from '../../components/CustomAlert';
import CustomButton from '../../components/CustomButton';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';
import SetSportsCategory from '../competition/CompetitionCreation/SetSportsCategory';

const defaultProfile = require('../../assets/images/default-profile.png');

const ProfileEdit = ({ navigation }) => {
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

  const handleDeleteAccount = () => {
    showAlert({
      title: '잠깐! 🚨',
      message: '탈퇴 시 모든 기록이 삭제됩니다.\n이 작업은 되돌릴 수 없습니다!\n\n정말로 탈퇴를 진행하시겠습니까?',
      onConfirm: async () => {
        try {
          // 회원 탈퇴 api
          hideAlert();
          showToast('💥 회원 탈퇴가 완료되었습니다.', 'success', 3000, 'top');
          // navigation.navigate('Login');
        } catch (error) {
          showToast('잠시 후 다시 시도해주세요.', 'error', 3000, 'top');
        }
      },
      onCancel: hideAlert,
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponents title="회원 정보 수정" icon="save" />
      <ScrollView style={styles.container}>
        <View style={styles.profileImgWrapper}>
          <Image source={defaultProfile} style={styles.profileImg} />
          <CustomButton theme="primary" size="xs" text="이미지 업로드" />
        </View>
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>닉네임</Text>
          <TextInput style={styles.input} placeholder="닉네임을 입력하세요" placeholderTextColor={'#7676AC'} />
        </View>
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>소개</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder={'어떤 운동을 좋아하시나요?\n자유롭게 본인을 소개해보세요!'}
            placeholderTextColor={'#7676AC'}
            multiline={true}
            numberOfLines={2}
            textAlignVertical="top"
          />
        </View>

        {/* 선호 운동 */}
        <View style={[styles.sectionWrapper, { gap: SPACING.sm }]}>
          <Text style={styles.sectionTitle}>관심 운동</Text>
          <SetSportsCategory />
        </View>

        <View style={{ alignItems: 'center', marginVertical: 30 }}>
          <TouchableOpacity activeOpacity={0.6} onPress={handleDeleteAccount}>
            <Text style={styles.accountDeleteText}>회원 탈퇴</Text>
          </TouchableOpacity>
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

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    ...LAYOUT_PADDING,
  },
  profileImgWrapper: {
    alignItems: 'center',
    marginVertical: 30,
    gap: SPACING.md,
  },
  profileImg: {
    width: 120,
    height: 120,
  },
  sectionWrapper: {
    gap: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.large,
    padding: SPACING.sm,
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[400],
    height: 46,
    justifyContent: 'center',
  },
  multilineInput: {
    height: 84,
    textAlignVertical: 'center',
    lineHeight: FONT_SIZES.md * 1.5,
  },
  accountDeleteText: {
    color: COLORS.red,
    fontSize: 18,
    fontFamily: FONTS.PRETENDARD[700],
  },
});
