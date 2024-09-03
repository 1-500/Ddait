import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import { getCompetitionDetail, getCompetitionRecord, getCompetitionRecordDetail } from '../../apis/competition';
import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/font';
import Invite from './rankingPageTabs/Invite';
import MyScore from './rankingPageTabs/MyScore';
import RankList from './rankingPageTabs/RankList';

/* eslint-disable */

const dummy_data = {
  room_info: {
    title: '스쿼트 챌린지 들어오세요!',
    max_members: 20,
    competition_type: '웨이트트레이닝',
    competition_theme: '경쟁 세부 테마',
    is_public: true,
    start_date: new Date(2024, 7, 1), //2024-08-01
    end_date: new Date(2024, 7, 31), //2024-08-31
  },
  record: [],
  myDetail: {},
  result: [
    {
      name: '나라1',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 1,
      score: {
        total: 127,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라2',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 2,
      score: {
        total: 125,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라3',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 3,
      score: {
        total: 122,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라4',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 4,
      score: {
        total: 118,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '따잇',
      profileImg: require('../../assets/images/profile.png'),
      isMe: true,
      rank: 5,
      score: {
        total: 106,
        data1: 22,
        data2: 16,
      },
    },
    {
      name: '나라5',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 6,
      score: {
        total: 102,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라6',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 7,
      score: {
        total: 88,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라7',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 8,
      score: {
        total: 83,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라8',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 9,
      score: {
        total: 77,
        data1: 18,
        data2: 14,
      },
    },
  ],
  usage_data: ['data1', 'data2'],
  friends: [
    {
      nickname: '따잇1',
      introduce: '소개글입니다',
      preferred_sport: '다이어트',
    },
    {
      nickname: '따잇2',
      introduce: '소개글입니다',
      preferred_sport: '걷기',
    },
    {
      nickname: '따잇3',
      introduce: '소개글입니다',
      preferred_sport: '등산',
    },
    {
      nickname: '따잇4',
      introduce: '소개글입니다',
      preferred_sport: '웨이트',
    },
    {
      nickname: '따잇5',
      introduce: '소개글입니다',
      preferred_sport: '다이어트',
    },
    {
      nickname: '따잇6',
      introduce: '소개글입니다',
      preferred_sport: '걷기',
    },
    {
      nickname: '따잇7',
      introduce: '소개글입니다',
      preferred_sport: '등산',
    },
    {
      nickname: '따잇8',
      introduce: '소개글입니다',
      preferred_sport: '웨이트',
    },
  ],
  my_result: {
    weight: 75,
    total_score: 13.74,
    scores: [
      {
        name: '데드리프트',
        score: 3.82,
        diary: [
          {
            created_at: '2024-08-06',
            record: [
              {
                set: 1,
                weight: 80,
                reps: 10,
              },
              {
                set: 2,
                weight: 80,
                reps: 10,
              },
              {
                set: 3,
                weight: 90,
                reps: 10,
              },
            ],
          },
        ],
      },
      {
        name: '스쿼트',
        score: 4.58,
        diary: [
          {
            created_at: '2024-08-06',
            record: [
              {
                set: 1,
                weight: 80,
                reps: 10,
              },
              {
                set: 2,
                weight: 80,
                reps: 10,
              },
              {
                set: 3,
                weight: 90,
                reps: 10,
              },
            ],
          },
        ],
      },
      {
        name: '벤치프레스',
        score: 5.34,
        diary: [
          {
            created_at: '2024-08-06',
            record: [
              {
                set: 1,
                weight: 80,
                reps: 10,
              },
              {
                set: 2,
                weight: 80,
                reps: 10,
              },
              {
                set: 3,
                weight: 90,
                reps: 10,
              },
            ],
          },
        ],
      },
    ],
  },
};

const CompetitionRoomRanking = () => {
  const layout = useWindowDimensions();
  const route = useRoute();
  const { competitionId } = route.params;
  const [competitionData, setCompetitionData] = useState();
  const [competitionRecord, setCompetitionRecord] = useState();
  const [competitionRecordDetail, setCompetitionRecordDetail] = useState();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'rankList', title: '랭킹' },
    { key: 'myScore', title: '내 점수' },
    { key: 'invite', title: '초대' },
  ]);

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
          console.log(res);
          setCompetitionRecord(res.data);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    };

    const fetchCompetitionRecordDetail = async () => {
      try {
        const res = await getCompetitionRecordDetail(competitionId);
        if (res.status === 200) {
          setCompetitionRecordDetail(res.data);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    };

    fetchCompetitionDetail();
    fetchCompetitionRecord();
    fetchCompetitionRecordDetail();
  }, [competitionId]);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'rankList':
        return <RankList data={competitionRecord} jumpTo={jumpTo} />;
      case 'myScore':
        return <MyScore data={dummy_data.my_result} jumpTo={jumpTo} />;
      case 'invite':
        return <Invite friends={dummy_data.friends} jumpTo={jumpTo} />;
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      {competitionData && <CompetitionRoomHeader data={competitionData} />}
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            activeColor={COLORS.white}
            inactiveColor={COLORS.lightGrey}
            labelStyle={{ fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semiBold }}
            indicatorStyle={{ backgroundColor: COLORS.primary }}
            style={{ backgroundColor: COLORS.darkBackground }}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
};

export default CompetitionRoomRanking;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
});
