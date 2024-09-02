import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getCompetitionDetail } from '../../apis/competition';
import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import CustomTag from '../../components/CustomTag';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/font';
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

const CompetitionRoom1V1 = () => {
  const maxGraphWidth = width - 180;
  const route = useRoute();
  const [competitionData, setCompetitionData] = useState();
  const { competitionId } = route.params;

  useEffect(() => {
    const fetchCompetitionDetail = async () => {
      try {
        const result = await getCompetitionDetail(competitionId);
        setCompetitionData(result.data);
      } catch (error) {
        Alert.alert('경쟁방 상세 정보 조회 실패', error.message);
      }
    };
    fetchCompetitionDetail();
  }, [competitionId]);

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
      {competitionData && <CompetitionRoomHeader data={competitionData} />}
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

export default CompetitionRoom1V1;

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
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  messageText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
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
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: 24,
    color: COLORS.white,
  },
  profileTailText: {
    textAlignVertical: 'bottom',
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
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
    fontWeight: FONT_WEIGHTS.medium,
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
    fontWeight: FONT_WEIGHTS.bold,
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
    fontWeight: FONT_WEIGHTS.regular,
    color: COLORS.white,
  },
});
