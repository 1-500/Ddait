import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
  user_info: [
    {
      nickname: '따잇',
      profile_image: require('../../assets/images/profile.png'),
    },
    {
      nickname: '나라',
      profile_image: require('../../assets/images/profile.png'),
    },
  ],
  usage_data: ['데드리프트', '벤치프레스', '스쿼트'],
};

const CompetitionRoom1VS1 = () => {
  const maxGraphWidth = width - 180;
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    // setResultData(getMyResult());
    setResultData([dummy_data.record[0], dummy_data.record[1]]);
  }, []);

  // const getMyResult = () => {
  //   const result =
  //     dummy_data.record[0].member_id === userId
  //       ? [dummy_data.record[0], dummy_data.record[1]]
  //       : [dummy_data.record[1], dummy_data.record[0]];
  //   return result;
  // };

  const CompetitionProfile = ({ userInfo, result, color, style }) => {
    return (
      <View style={[styles.profileWrapper, style]}>
        <Image style={{ width: 80, height: 80 }} source={userInfo.profile_image} />
        <View>
          <View style={styles.profileTextWrapper}>
            <Text style={styles.profileText}>{userInfo.nickname}</Text>
            <Text style={styles.profileTailText}>님</Text>
          </View>
          <Text style={[styles.profileText, { color: color }]}>{result.total_score}</Text>
        </View>
      </View>
    );
  };

  const Competition1VS1Header = () => {
    return (
      <View>
        <View style={styles.messageWrapper}>
          <Text style={styles.userNameText}>{dummy_data.user_info[0].nickname}님,</Text>
          <Text style={styles.messageText}>
            {resultData[0].total_score >= resultData[1].total_score
              ? '지금 이기고 있네요! 계속 가봅시다'
              : '지고있어요.. 조금만 더 힘내요!'}
          </Text>
        </View>
        <View style={styles.profileContainer}>
          <CompetitionProfile
            userInfo={dummy_data.user_info[0]}
            result={resultData[0]}
            color={COLORS.primary}
            style={
              resultData[0].total_score >= resultData[1].total_score && {
                borderWidth: 3,
                borderColor: COLORS.primary,
              }
            }
          />
          <CompetitionProfile
            userInfo={dummy_data.user_info[1]}
            result={resultData[1]}
            color={COLORS.secondary}
            style={
              resultData[1].total_score >= resultData[0].total_score && {
                borderWidth: 3,
                borderColor: COLORS.secondary,
              }
            }
          />
          <CustomTag size="small" text="VS" style={styles.vsTag} textStyle={styles.vsTagText} />
        </View>
      </View>
    );
  };

  const renderScoreItem = ({ item, index }) => {
    return (
      <View style={styles.scoreWrapper}>
        <Text style={styles.scoreTitleText} numberOfLines={3} ellipsizeMode="tail">
          {item.name}
        </Text>
        <View style={styles.graphContainer}>
          <View style={styles.graphWrapper}>
            <View
              style={[
                styles.graph,
                {
                  backgroundColor: COLORS.primary,
                  width:
                    (maxGraphWidth * resultData[0].score_detail[index].score) /
                    (Math.max(resultData[1].score_detail[index].score, resultData[0].score_detail[index].score) || 1),
                },
              ]}
            />
            <Text style={styles.scoreText}>{resultData[0].score_detail[index].score}</Text>
          </View>
          <View style={styles.graphWrapper}>
            <View
              style={[
                styles.graph,
                {
                  backgroundColor: COLORS.secondary,
                  width:
                    (maxGraphWidth * resultData[1].score_detail[index].score) /
                    (Math.max(resultData[0].score_detail[index].score, resultData[1].score_detail[index].score) || 1),
                },
              ]}
            />
            <Text style={styles.scoreText}>{resultData[1].score_detail[index].score}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <CompetitionRoomHeader data={dummy_data.room_info} />
      {resultData[0] && resultData[1] && (
        <View style={[{ paddingTop: 30 }, LAYOUT_PADDING]}>
          <FlatList
            data={dummy_data.record[0].score_detail}
            keyExtractor={(item, index) => index}
            renderItem={renderScoreItem}
            ListHeaderComponent={Competition1VS1Header}
            ListFooterComponent={<View style={{ height: 30 }} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          />
        </View>
      )}
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
