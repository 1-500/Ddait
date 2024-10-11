import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { RADIUS } from '../constants/radius';
import { SPACING } from '../constants/space';

const SkeletonLoader = ({ type }) => {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  const AnimatedBlock = ({ style, borderRadius }) => (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          backgroundColor: COLORS.lightGrey,
          borderRadius: borderRadius || RADIUS.small,
        },
      ]}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerTitle}>
          <AnimatedBlock style={styles.Icon} />
          <AnimatedBlock style={styles.headerTitleText} />
          <AnimatedBlock style={styles.Icon} />
        </View>
        <AnimatedBlock style={styles.Icon} />
      </View>
      <View style={styles.tagsWrapper}>
        <AnimatedBlock style={styles.tag} />
        <AnimatedBlock style={styles.tag} />
        <AnimatedBlock style={styles.tag} />
      </View>
      <View style={styles.periodWrapper}>
        <AnimatedBlock style={styles.periodText} />
      </View>
    </View>
  );

  const renderRankList = () => (
    <View style={styles.rankList}>
      <AnimatedBlock style={[styles.rankItem, { height: 160 }]} borderRadius={RADIUS.large} />
      <AnimatedBlock style={[styles.rankItem, { height: 70 }]} borderRadius={RADIUS.large} />
    </View>
  );

  const renderMyScore = () => (
    <View style={styles.myScore}>
      <AnimatedBlock style={[styles.scoreItem, { height: 100 }]} borderRadius={RADIUS.large} />
      <AnimatedBlock style={[styles.scoreItem, { height: 100 }]} borderRadius={RADIUS.large} />
      <AnimatedBlock style={[styles.scoreItem, { height: 100 }]} borderRadius={RADIUS.large} />
    </View>
  );

  const renderCompetitionItem = () => (
    <View style={styles.competitionContainer}>
      <View style={{ gap: SPACING.xs }}>
        <View style={styles.titleContainer}>
          <AnimatedBlock style={{ width: 150, height: 24 }} />
          <AnimatedBlock style={{ width: 30, height: 24 }} />
        </View>
        <View style={{ flexDirection: 'row', gap: SPACING.xxs }}>
          <AnimatedBlock style={{ width: 60, height: 24 }} />
          <AnimatedBlock style={{ width: 60, height: 24 }} />
          <AnimatedBlock style={{ width: 60, height: 24 }} />
        </View>
        <AnimatedBlock style={{ width: 120, height: 20 }} />
      </View>
      <View style={styles.competitionMemberContainer}>
        <AnimatedBlock style={{ width: 40, height: 24 }} />
      </View>
    </View>
  );
  const renderFoodRecordItem = () => {
    return (
      <View style={styles.foodRecordContainer}>
        <AnimatedBlock style={styles.foodRecordItem} borderRadius={RADIUS.large} />
        <AnimatedBlock style={styles.foodRecordItem} borderRadius={RADIUS.large} />
      </View>
    );
  };

  switch (type) {
    case 'header':
      return renderHeader();
    case 'rankList':
      return renderRankList();
    case 'myScore':
      return renderMyScore();
    case 'competitionItem':
      return renderCompetitionItem();

    case 'foodRecordItem':
      return renderFoodRecordItem();
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  header: {
    gap: SPACING.md,
    padding: SPACING.lg,
    backgroundColor: COLORS.darkGreyBackground,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerTitleText: {
    width: 150,
    height: 32,
  },
  Icon: {
    width: 28,
    height: 28,
  },
  tagsWrapper: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  tag: {
    width: 72,
    height: 28,
  },
  periodWrapper: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  periodText: {
    width: 160,
    height: 24,
  },
  rankList: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  rankItem: {
    marginBottom: 16,
  },
  myScore: {
    paddingHorizontal: 20,
    marginTop: 30,
    padding: 16,
  },
  scoreItem: {
    marginBottom: 16,
  },
  competitionContainer: {
    backgroundColor: COLORS.darkGrey,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.xs,
  },
  competitionMemberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },

  foodRecordContainer: {
    height: 300,
  },
  foodRecordItem: {
    padding: 20,
    marginVertical: 5,
    height: 80,
  },
});

export default SkeletonLoader;
