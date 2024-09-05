import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import {
  enterCompetition,
  getCompetitionDetail,
  getCompetitionRecord,
  getCompetitionRecordDetail,
  leaveCompetition,
} from '../../apis/competition';
import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/font';
import { isInCompetitionProgress } from '../../utils/competition';
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

const CompetitionRoomRanking = ({ navigation }) => {
  const layout = useWindowDimensions();
  const route = useRoute();
  const { competitionId } = route.params;
  const [competitionData, setCompetitionData] = useState();
  const [competitionRecord, setCompetitionRecord] = useState();
  const [competitionRecordDetail, setCompetitionRecordDetail] = useState();
  const [isInProgress, setIsInProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'rankList', title: '랭킹' },
    { key: 'myScore', title: '내 점수' },
    { key: 'invite', title: '초대' },
  ]);

  const fetchCompetitionDetail = async () => {
    try {
      const result = await getCompetitionDetail(competitionId);
      setIsInProgress(isInCompetitionProgress(result.data));
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

  const fetchAllData = useCallback(async () => {
    if (isDeleted) return;
    setLoading(true);
    try {
      await Promise.all([fetchCompetitionDetail(), fetchCompetitionRecord(), fetchCompetitionRecordDetail()]);
    } catch (error) {
      console.log('fetchAllData 실패', error);
    } finally {
      setLoading(false);
    }
  }, [competitionId, isDeleted]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isDeleted) {
      fetchAllData();
    }
  }, [isFocused, isDeleted]);

  const handleJoin = async () => {
    try {
      const res = await enterCompetition(competitionId);
      if (res.status === 200) {
        Alert.alert('성공', '경쟁방에 참여했습니다!');
        fetchAllData();
      }
    } catch (error) {
      console.log('error: ', error);
      Alert.alert('오류', '경쟁방에 참여에 실패했습니다!');
    }
  };

  const handleLeave = async () => {
    Alert.alert('경쟁방 나가기', '이 경쟁방에서 나가시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '나가기',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await leaveCompetition(competitionId);
            if (res.status === 200) {
              Alert.alert('성공', '경쟁방에서 나갔습니다');
              navigation.goBack();
            }
          } catch (error) {
            console.log('error: ', error);
            Alert.alert('오류', '경쟁방에 나가기에 실패했습니다!');
          }
        },
      },
    ]);
  };

  const handleDelete = useCallback(
    (success, message) => {
      if (success) {
        Alert.alert('경쟁방 삭제', '경쟁방이 삭제되었습니다 😢', [
          {
            text: '확인',
            onPress: () => {
              setIsDeleted(true);
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert('삭제 실패', message);
      }
    },
    [navigation],
  );

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'rankList':
        return (
          <RankList
            data={competitionRecord}
            competitionData={competitionData}
            isInProgress={isInProgress}
            onJoin={handleJoin}
            onLeave={handleLeave}
            jumpTo={jumpTo}
          />
        );
      case 'myScore':
        return <MyScore data={competitionRecordDetail} jumpTo={jumpTo} />;
      case 'invite':
        return <Invite friends={dummy_data.friends} jumpTo={jumpTo} />;
    }
  };

  if (isDeleted) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      {competitionData && <CompetitionRoomHeader data={competitionData} onDelete={handleDelete} />}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkBackground,
  },
});
