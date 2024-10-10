import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { RADIUS } from '../../constants/radius';
import { SPACING } from '../../constants/space';

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
      <AnimatedBlock style={[styles.listItem, { height: 160 }]} borderRadius={RADIUS.large} />
      <AnimatedBlock style={[styles.listItem, { height: 70 }]} borderRadius={RADIUS.large} />
    </View>
  );

  const renderMyScore = () => (
    <View style={styles.myScore}>
      <AnimatedBlock style={[styles.listItem, { height: 100 }]} borderRadius={RADIUS.large} />
      <AnimatedBlock style={[styles.listItem, { height: 100 }]} borderRadius={RADIUS.large} />
      <AnimatedBlock style={[styles.listItem, { height: 100 }]} borderRadius={RADIUS.large} />
    </View>
  );
  const renderList = () => (
    <>
      <AnimatedBlock style={[styles.listItem, { height: 80 }]} borderRadius={RADIUS.large} />
      <AnimatedBlock style={[styles.listItem, { height: 80 }]} borderRadius={RADIUS.large} />
      <AnimatedBlock style={[styles.listItem, { height: 80 }]} borderRadius={RADIUS.large} />
    </>
  );

  switch (type) {
    case 'header':
      return renderHeader();
    case 'rankList':
      return renderRankList();
    case 'myScore':
      return renderMyScore();
    case 'list':
      return renderList();
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
  myScore: {
    paddingHorizontal: 20,
    marginTop: 30,
    padding: 16,
  },
  listItem: {
    marginBottom: 16,
  },
});

export default SkeletonLoader;
