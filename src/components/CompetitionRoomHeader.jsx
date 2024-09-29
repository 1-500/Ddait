import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONTS } from '../constants/font';
import { RADIUS } from '../constants/radius';
import { SPACING } from '../constants/space';
import CustomTag from './CustomTag';

const CompetitionRoomHeader = ({ data, progress, onDelete }) => {
  const navigation = useNavigation();
  const startDate = dayjs(data.date.start_date);
  const endDate = dayjs(data.date.end_date);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleDeletePress = () => {
    setShowDropdown(false);
    onDelete();
  };

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.headerContent}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          >
            <FontAwesome name="angle-left" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitleText}>{data.title}</Text>
          {data.settings.is_private ? (
            <Octicons name="lock" size={24} color={COLORS.lightGrey} />
          ) : (
            <Octicons name="unlock" size={24} color={COLORS.primary} />
          )}
        </View>
        {data.user_status.is_host && dayjs(data.date.start_date).isAfter(dayjs(), 'day') && (
          <TouchableOpacity onPress={toggleDropdown} activeOpacity={0.6}>
            <Feather name="more-horizontal" size={28} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.tagsWrapper}>
        <CustomTag size="big" text={data.info.competition_type} />
        <CustomTag size="big" text={data.info.competition_theme} style={{ backgroundColor: COLORS.warmGrey }} />
        <CustomTag size="big" text={data.info.max_members > 2 ? '랭킹전' : '1:1'} />
      </View>
      <View style={styles.periodWrapper}>
        <Text style={styles.periodText}>{`${startDate.format('YY.MM.DD')}~${endDate.format('YY.MM.DD')}`}</Text>
        <Text style={styles.periodText}>
          {(() => {
            switch (progress) {
              case 'BEFORE':
                return `🗓️ 시작 D-${startDate.diff(dayjs(), 'days')}`;
              case 'IN_PROGRESS':
                return `🔥 종료 D-${endDate.diff(dayjs(), 'days')}`;
              case 'AFTER':
                return '🎉 종료';
            }
          })()}
        </Text>
      </View>

      <Modal transparent visible={showDropdown} onRequestClose={() => setShowDropdown(false)}>
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleDeletePress}>
                <Text style={styles.dropdownText}>삭제하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CompetitionRoomHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.darkGreyBackground,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  headerTitleText: {
    fontSize: 24,
    fontFamily: FONTS.PRETENDARD[600],
    lineHeight: 32,
    color: COLORS.white,
  },
  tagsWrapper: {
    flexDirection: 'row',
    gap: SPACING.xs,
    alignItems: 'center',
  },
  periodWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  periodText: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.semiLightGrey,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    alignItems: 'center',
    position: 'absolute',
    padding: SPACING.xs,
    backgroundColor: COLORS.darkBackground,
    borderRadius: RADIUS.large,
    borderColor: COLORS.red,
    borderWidth: 1,
    top: 110,
    right: SPACING.lg,
  },
  dropdownItem: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  dropdownText: {
    color: COLORS.red,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[500],
  },
});
