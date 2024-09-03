import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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

import { getCompetitionDetail } from '../../apis/competition';
import { getCompetitionRecord } from '../../apis/competition';
import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import CustomTag from '../../components/CustomTag';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const { width } = Dimensions.get('window');

const dummyProfile = require('../../assets/images/profile.png');

/* eslint-disable */

const CompetitionRoom1VS1 = () => {
  const maxGraphWidth = width - 180;
  const route = useRoute();
  const { competitionId } = route.params;
  const [competitionData, setCompetitionData] = useState();
  const [competitionRecord, setCompetitionRecord] = useState();

  useEffect(() => {
    const fetchCompetitionDetail = async () => {
      try {
        const result = await getCompetitionDetail(competitionId);
        setCompetitionData(result.data);
      } catch (error) {
        Alert.alert('경쟁방 상세 정보 조회 실패', error.message);
      }
    };

    const fetchCompetitionRecord = async () => {
      try {
        const res = await getCompetitionRecord(competitionId);
        if (res.status === 200) {
          const sortedData = res.data[1].is_my_record ? [res.data[1], res.data[0]] : [res.data[0], res.data[1]];
          setCompetitionRecord(sortedData);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    };

    fetchCompetitionDetail();
    fetchCompetitionRecord();
  }, [competitionId]);

  const CompetitionProfile = ({ record, color, style }) => {
    console.log(record.member_info);
    return (
      <View style={[styles.profileWrapper, style]}>
        <Image
          style={{ width: 80, height: 80 }}
          source={record.member_info.profile_image ? { uri: record.member_info.profile_image } : dummyProfile}
        />
        <View>
          <View style={styles.profileTextWrapper}>
            <Text style={styles.profileText}>{record.member_info.nickname}</Text>
            <Text style={styles.profileTailText}>님</Text>
          </View>
          <Text style={[styles.profileText, { color: color }]}>{record.total_score}</Text>
        </View>
      </View>
    );
  };

  const Competition1VS1Header = ({ data }) => {
    return (
      <View style={{ paddingBottom: 20 }}>
        <View style={styles.messageWrapper}>
          <Text style={styles.userNameText}>{data[0].member_info.nickname}님,</Text>
          <Text style={styles.messageText}>
            {(() => {
              if (data[0].total_score > data[1].total_score) {
                return '지금 이기고 있네요! 계속 가봅시다';
              } else if (data[0].total_score < data[1].total_score) {
                return '지고있어요.. 조금만 더 힘내요!';
              } else {
                return '비기고 있어요! 조금만 더 해봅시다';
              }
            })()}
          </Text>
        </View>
        <View style={styles.profileContainer}>
          <CompetitionProfile
            record={data[0]}
            color={COLORS.primary}
            style={
              data[0].total_score >= data[1].total_score && {
                borderWidth: 3,
                borderColor: COLORS.primary,
              }
            }
          />
          <CompetitionProfile
            record={data[1]}
            color={COLORS.secondary}
            style={
              data[1].total_score >= data[0].total_score && {
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
                    (maxGraphWidth * competitionRecord[0].score_detail[index].score) /
                    (Math.max(
                      competitionRecord[1].score_detail[index].score,
                      competitionRecord[0].score_detail[index].score,
                    ) || 1),
                },
              ]}
            />
            <Text style={styles.scoreText}>{competitionRecord[0].score_detail[index].score}</Text>
          </View>
          <View style={styles.graphWrapper}>
            <View
              style={[
                styles.graph,
                {
                  backgroundColor: COLORS.secondary,
                  width:
                    (maxGraphWidth * competitionRecord[1].score_detail[index].score) /
                    (Math.max(
                      competitionRecord[0].score_detail[index].score,
                      competitionRecord[1].score_detail[index].score,
                    ) || 1),
                },
              ]}
            />
            <Text style={styles.scoreText}>{competitionRecord[1].score_detail[index].score}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      {competitionData && <CompetitionRoomHeader data={competitionData} />}
      {competitionRecord && (
        <View style={[{ paddingTop: 30 }, LAYOUT_PADDING]}>
          <FlatList
            data={competitionRecord[0].score_detail}
            keyExtractor={(item, index) => item.name}
            renderItem={renderScoreItem}
            ListHeaderComponent={<Competition1VS1Header data={competitionRecord} />}
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
