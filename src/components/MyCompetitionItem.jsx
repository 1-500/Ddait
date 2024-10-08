import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONTS } from '../constants/font';
import { RADIUS } from '../constants/radius';
import { SPACING } from '../constants/space';
import { formDate } from '../utils/date';

const MyCompetitionItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.competitionContainer}>
    <View style={styles.titleContainer}>
      <Text style={styles.competitionTitle}>{item.title}</Text>
      {item.settings.is_private ? (
        <Octicons name="lock" size={16} color={COLORS.lightGrey} />
      ) : (
        <Octicons name="unlock" size={16} color={COLORS.primary} />
      )}
    </View>
    <Text style={styles.competitionDate}>
      {formDate(item.date.start_date)} ~ {formDate(item.date.end_date)}
    </Text>
    <View style={styles.competitionMembersContainer}>
      {item.user_status.is_host ? (
        <FontAwesome6 name="crown" size={16} color={COLORS.lightGreen} />
      ) : (
        <Ionicons name="person" size={16} color={COLORS.lightPurple} />
      )}
      <Text
        style={[styles.competitionMembers, { color: item.user_status.is_host ? COLORS.secondary : COLORS.primary }]}
      >
        {item.info.current_members} / {item.info.max_members}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  competitionContainer: {
    backgroundColor: COLORS.darkGrey,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    borderRadius: RADIUS.large,
    gap: SPACING.xs,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.xs,
  },
  competitionTitle: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
  },
  competitionDate: {
    color: COLORS.semiLightGrey,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
  },
  competitionMembersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  competitionMembers: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
  },
});

export default MyCompetitionItem;
