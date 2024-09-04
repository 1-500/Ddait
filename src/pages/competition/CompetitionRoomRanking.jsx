import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import { getCompetitionDetail, getCompetitionRecord, getCompetitionRecordDetail } from '../../apis/competition';
import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/font';
import Invite from './rankingPageTabs/Invite';
import MyScore from './rankingPageTabs/MyScore';
import RankList from './rankingPageTabs/RankList';

/* eslint-disable */

const dummy_data = {
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
        return <MyScore data={competitionRecordDetail} jumpTo={jumpTo} />;
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
