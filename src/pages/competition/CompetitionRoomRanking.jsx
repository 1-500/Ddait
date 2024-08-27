import React from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/font';
import Invite from './rankingPageTabs/Invite';
import MyScore from './rankingPageTabs/MyScore';
import RankList from './rankingPageTabs/RankList';

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
};

const renderScene = ({ route, jumpTo }) => {
  switch (route.key) {
    case 'rankList':
      return <RankList data={dummy_data} jumpTo={jumpTo} />;
    case 'myScore':
      return <MyScore jumpTo={jumpTo} />;
    case 'invite':
      return <Invite friends={dummy_data.friends} jumpTo={jumpTo} />;
  }
};

const CompetitionRoomRanking = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'rankList', title: '랭킹' },
    { key: 'myScore', title: '내 점수' },
    { key: 'invite', title: '초대' },
  ]);

  return (
    <SafeAreaView style={styles.pageContainer}>
      <CompetitionRoomHeader data={dummy_data.room_info} />
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
