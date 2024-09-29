import dayjs from 'dayjs';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';

const CompetitionRecordDetail = ({ navigation, route }) => {
  const { score_detail } = route.params;

  const renderDiary = ({ item, index }) => {
    return (
      <View style={styles.diaryWrapper}>
        <Text style={styles.diaryTitleText}>
          {dayjs(item.created_at).format('YYYY년 MM월 DD일')} {item.title}
        </Text>
        {item.record.map((e, i) => (
          <View style={styles.recordWrapper} key={`${index}|${e.set}`}>
            <Text style={styles.recordText}>{e.set}</Text>
            <Text style={styles.recordText}>{`${e.weight}kg × ${e.reps}회`}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <HeaderComponents icon="none" title={score_detail.name} />
      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={score_detail.diary}
        keyExtractor={(item, index) => `${index}|${item.created_at}`}
        renderItem={renderDiary}
        ListFooterComponent={<Text style={styles.scoreText}>점수: {score_detail.score}</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>아직 기록이 없어요..</Text>}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CompetitionRecordDetail;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  titleText: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  scoreText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[600],
    color: COLORS.white,
    paddingTop: 10,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
    paddingTop: 20,
  },
  diaryWrapper: {
    paddingVertical: 20,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkBorder,
  },
  diaryTitleText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
    paddingBottom: 4,
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
