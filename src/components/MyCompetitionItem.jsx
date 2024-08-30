import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../constants/font';
import { RADIUS } from '../constants/radius';
import { SPACING } from '../constants/space';
import { formDate } from '../utils/date';

const MyCompetitionItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.competitionContainer}>
    <Text style={styles.competitionName}>{item.title}</Text>
    <Text style={styles.competitionDate}>
      {formDate(item.start_date)} ~ {formDate(item.end_date)}
    </Text>
    <View style={styles.competitionMembersContainer}>
      <Ionicons name="person" size={16} color={COLORS.semiLightGrey} />
      <Text style={styles.competitionMembers}>
        {item.current_members} / {item.max_members}
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
    marginBottom: SPACING.md,
  },
  competitionName: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  },
  competitionDate: {
    color: COLORS.semiLightGrey,
    fontSize: FONT_SIZES.sm,
  },
  competitionMembersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  competitionMembers: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
  },
});

export default MyCompetitionItem;
