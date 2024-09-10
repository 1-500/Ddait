import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import CustomButton from '../../components/CustomButton';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';
import SetSportsCategory from '../competition/CompetitionCreation/SetSportsCategory';

const defaultProfile = require('../../assets/images/default-profile.png');

const ProfileEdit = ({ navigation }) => {
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
      </ScrollView>
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
});
