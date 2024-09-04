import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../../constants/space';

const MyScore = ({ data }) => {
  const renderScoreItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.scoreItemWrapper} activeOpacity={0.6}>
        <Text style={styles.exerciseNameText}>{item.name}</Text>
        <View style={{ gap: 4 }}>
          {item.diary[item.diary.length - 1].record.map((e, i) => (
            <View style={styles.recordWrapper}>
              <Text style={styles.recordText}>{e.set}</Text>
              <Text style={styles.recordText}>{`${e.weight}kg × ${e.reps}회`}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.recordText, { fontFamily: FONTS.PRETENDARD[600] }]}>{`점수: ${item.score}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[{ flex: 1 }, LAYOUT_PADDING]}>
      <FlatList
        data={data?.score_detail}
        keyExtractor={(item, index) => item.name}
        renderItem={renderScoreItem}
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
        ListHeaderComponent={
          data && (
            <View style={{ paddingTop: 30, paddingBottom: 16 }}>
              <Text style={styles.titleText}>기록 현황</Text>
              <View style={styles.totalScoreWrapper}>
                <Text style={styles.totalScoreText}>{`총점: ${data.total_score}`}</Text>
                <Text style={styles.weightText}>{`몸무게: ${data.member_info.weight}kg`}</Text>
              </View>
            </View>
          )
        }
        ListFooterComponent={<View style={{ height: 30 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyScore;

const styles = StyleSheet.create({
  titleText: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[600],
    color: COLORS.white,
  },
  totalScoreWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  totalScoreText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
  },
  weightText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    color: COLORS.white,
  },
  scoreItemWrapper: {
    gap: 8,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.darkGreyBackground,
    borderRadius: 24,
  },
  exerciseNameText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  recordWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  recordText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
  },
});
