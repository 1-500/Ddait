import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONTS } from '../constants/font';
import { SPACING } from '../constants/space';
import CustomButton from './CustomButton';
import CustomTag from './CustomTag';

const dummyProfileImage = require('../assets/images/profile.png');

const MemberProfileItem = ({ memberData, onAccept, onReject, rightBtn = 'menu', onRightBtnPress = () => {} }) => {
  const renderRightBtn = () => {
    if (rightBtn === 'menu') {
      return (
        <TouchableOpacity onPress={onRightBtnPress} activeOpacity={0.6}>
          <MaterialCommunityIcons name="dots-vertical" size={20} color={COLORS.white} />
        </TouchableOpacity>
      );
    } else if (rightBtn === 'invite') {
      return (
        <TouchableOpacity onPress={onRightBtnPress} activeOpacity={0.6}>
          <MaterialCommunityIcons name="email-plus-outline" size={20} color={COLORS.white} />
        </TouchableOpacity>
      );
    } else if (rightBtn === 'request') {
      return (
        <View style={styles.btnWrapper}>
          <CustomButton text="수락" theme="primary" size="xs" onPress={() => onAccept(memberData.id)} />
          <CustomButton text="거절" theme="block" size="xs" onPress={() => onReject(memberData.id)} />
        </View>
      );
    } else {
      return <View style={{ width: 20, height: 20 }} />;
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileWrapper}>
        <Image
          style={styles.profileImage}
          source={memberData.profile_image ? { uri: memberData.profile_image } : dummyProfileImage}
        />
        <View style={styles.profileInfoWrapper}>
          <Text style={styles.nicknameText}>{memberData.nickname}</Text>
          <Text style={styles.introduceText} ellipsizeMode="tail" numberOfLines={1}>
            {memberData.introduce}
          </Text>
          <CustomTag size="small" text={memberData.preferred_sport} />
        </View>
      </View>
      {renderRightBtn()}
    </View>
  );
};

export default MemberProfileItem;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#303030',
  },
  profileWrapper: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  profileInfoWrapper: {
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  nicknameText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
    marginBottom: 2,
  },
  introduceText: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  btnWrapper: {
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'flex-end',
    gap: 8,
  },
});
