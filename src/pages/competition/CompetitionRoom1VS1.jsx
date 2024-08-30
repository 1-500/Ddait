import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import CustomTag from '../../components/CustomTag';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, FONTS } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const { width } = Dimensions.get('window');

const dummy_data = {
  room_info: {
    title: '나라랑 따잇이랑',
    max_members: 2,
    competition_type: '웨이트트레이닝',
    competition_theme: '경쟁 세부 테마',
    is_public: false,
    start_date: new Date(2024, 7, 1), //2024-08-01
    end_date: new Date(2024, 7, 31), //2024-08-31
  },
  record: [
    {
      id: 'competition_record_uuid1',
      member_id: 'member_uuid1',
      competition_room_id: 'competition_room_uuid1',
      rank: null,
      total_score: 19.79,
      created_at: '2024-08-26T18:17:51.368969+00:00',
      score_detail: [
        {
          name: '데드리프트',
          score: 0,
        },
        {
          name: '벤치프레스',
          score: 2.51,
        },
        {
          name: '스쿼트',
          score: 17.28,
        },
      ],
    },
    {
      id: 'competition_record_uuid2',
      member_id: 'member_uuid2',
      competition_room_id: 'competition_room_uuid1',
      rank: null,
      total_score: 0,
      created_at: '2024-08-27T13:44:16+00:00',
      score_detail: [
        {
          name: '데드리프트',
          score: 0,
        },
        {
          name: '벤치프레스',
          score: 0,
        },
        {
          name: '스쿼트',
          score: 0,
        },
      ],
    },
  ],
  result: {
    me: {
      name: '따잇',
      profileImg: require('../../assets/images/profile.png'),
      score: {
        total: 102,
        data1: 22,
        data2: 16,
      },
    },
    opponent: {
      name: '나라',
      profileImg: require('../../assets/images/profile.png'),
      score: {
        total: 88,
        data1: 18,
        data2: 14,
      },
    },
  },
  usage_data: ['data1', 'data2'],
};

const CompetitionRoom1VS1 = () => {
  const maxGraphWidth = width - 180;

  const renderCompetitionProfile = (data, color, style) => {
    return (
      <View style={[styles.profileWrapper, style]}>
        <Image style={{ width: 80, height: 80 }} source={data.profileImg} />
        <View>
          <View style={styles.profileTextWrapper}>
            <Text style={styles.profileText}>{data.name}</Text>
            <Text style={styles.profileTailText}>님</Text>
          </View>
          <Text style={[styles.profileText, { color: color }]}>{data.score.total}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <CompetitionRoomHeader data={dummy_data.room_info} />
      <ScrollView style={[{ paddingTop: 30 }, LAYOUT_PADDING]}>
        <View style={styles.messageWrapper}>
          <Text style={styles.userNameText}>{dummy_data.result.me.name}님,</Text>
          <Text style={styles.messageText}>지금 이기고 있네요! 계속 가봅시다</Text>
        </View>
        <View style={styles.profileContainer}>
          {renderCompetitionProfile(
            dummy_data.result.me,
            COLORS.primary,
            dummy_data.result.me.score.total >= dummy_data.result.opponent.score.total && {
              borderWidth: 3,
              borderColor: COLORS.primary,
            },
          )}
          {renderCompetitionProfile(
            dummy_data.result.opponent,
            COLORS.secondary,
            dummy_data.result.opponent.score.total >= dummy_data.result.me.score.total && {
              borderWidth: 3,
              borderColor: COLORS.secondary,
            },
          )}
          <CustomTag size="small" text="VS" style={styles.vsTag} textStyle={styles.vsTagText} />
        </View>
        <View style={styles.resultDataWrapper}>
          {dummy_data.usage_data.map((name, index) => (
            <View key={index} style={styles.scoreWrapper}>
              <Text style={styles.scoreTitleText} numberOfLines={3} ellipsizeMode="tail">
                {name}
              </Text>
              <View style={styles.graphContainer}>
                <View style={styles.graphWrapper}>
                  <View
                    style={[
                      styles.graph,
                      {
                        backgroundColor: COLORS.primary,
                        width:
                          (maxGraphWidth * dummy_data.result.me.score[name]) /
                          Math.max(dummy_data.result.me.score[name], dummy_data.result.opponent.score[name]),
                      },
                    ]}
                  />
                  <Text style={styles.scoreText}>{dummy_data.result.me.score[name]}</Text>
                </View>
                <View style={styles.graphWrapper}>
                  <View
                    style={[
                      styles.graph,
                      {
                        backgroundColor: COLORS.secondary,
                        width:
                          (maxGraphWidth * dummy_data.result.opponent.score[name]) /
                          Math.max(dummy_data.result.me.score[name], dummy_data.result.opponent.score[name]),
                      },
                    ]}
                  />
                  <Text style={styles.scoreText}>{dummy_data.result.opponent.score[name]}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompetitionRoom1VS1;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  messageWrapper: {
    gap: 2,
  },
  userNameText: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  messageText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    color: COLORS.white,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  profileWrapper: {
    width: width / 2 - 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    borderRadius: 30,
    backgroundColor: COLORS.darkGreyBackground,
  },
  profileTextWrapper: {
    flexDirection: 'row',
    gap: 4,
  },
  profileText: {
    textAlign: 'center',
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
    lineHeight: 24,
    color: COLORS.white,
  },
  profileTailText: {
    textAlignVertical: 'bottom',
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    color: COLORS.semiLightGrey,
  },
  vsTag: {
    position: 'absolute',
    top: 76,
    left: width / 2 - 40,
    width: 40,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  vsTagText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
  },
  resultDataWrapper: {
    marginTop: 30,
    gap: SPACING.lg,
  },
  scoreWrapper: {
    flexDirection: 'row',
    gap: SPACING.md,
    alignItems: 'center',
  },
  scoreTitleText: {
    width: 60,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  graphContainer: {
    gap: 2,
  },
  graphWrapper: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  graph: {
    height: 20,
    borderRadius: RADIUS.small,
  },
  scoreText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    color: COLORS.white,
  },
});
