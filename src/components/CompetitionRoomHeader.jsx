import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../constants/font';
import { SPACING } from '../constants/space';
import CustomTag from './CustomTag';

const CompetitionRoomHeader = ({ data }) => {
  const navigation = useNavigation();
  const startDate = dayjs(data.start_date);
  const endDate = dayjs(data.end_date);

  return (
    <View style={styles.headerWrapper}>
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
        {data.is_public ? (
          <Octicons name="unlock" size={24} color={COLORS.white} />
        ) : (
          <Octicons name="lock" size={24} color={COLORS.primary} />
        )}
      </View>
      <View style={styles.tagsWrapper}>
        <CustomTag size="big" text={data.competition_type} />
        <CustomTag size="big" text={data.competition_theme} />
        <CustomTag size="big" text={data.max_members > 2 ? '랭킹전' : '1:1'} />
      </View>
      <View style={styles.periodWrapper}>
        <Text style={styles.periodText}>{`${startDate.format('YY.MM.DD')}~${endDate.format('YY.MM.DD')}`}</Text>
        <Text style={styles.periodText}>{`🔥 D-${endDate.diff(dayjs(), 'days')}`}</Text>
      </View>
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
    fontWeight: FONT_WEIGHTS.semiBold,
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
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.semiLightGrey,
  },
});
