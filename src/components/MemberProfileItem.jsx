import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../constants/font';
import { SPACING } from '../constants/space';
import CustomTag from './CustomTag';

const { width } = Dimensions.get('window');
const dummyProfileImage = require('../assets/images/profile.png');

const MemberProfileItem = ({ memberData, rightBtn = 'menu', onRightBtnPress = () => {} }) => {
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
          <View style={styles.tagsContainer}>
            {memberData.preferred_sport.map((sport, index) => (
              <CustomTag key={`${sport}-${index}`} size="small" text={sport} />
            ))}
          </View>
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#303030',
  },
  profileWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  profileInfoWrapper: {
    maxWidth: width - 130,
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  nicknameText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: 2,
  },
  introduceText: {
    fontSize: FONT_SIZES.xxs,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xxs,
  },
});
