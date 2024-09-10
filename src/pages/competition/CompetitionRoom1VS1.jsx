import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import { getCompetitionDetail, getCompetitionRecordDetail } from '../../apis/competition';
import { getCompetitionRecord } from '../../apis/competition';
import { getMyFriends } from '../../apis/friend';
import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { getCompetitionProgress } from '../../utils/competition';
import Invite from './rankingPageTabs/Invite';
import MyScore from './rankingPageTabs/MyScore';
import Score1VS1 from './rankingPageTabs/Score1VS1';
import SkeletonLoader from './rankingPageTabs/SkeletonLoader';

/* eslint-disable */

const CompetitionRoom1VS1 = () => {
  const layout = useWindowDimensions();
  const route = useRoute();
  const { competitionId, isParticipant } = route.params;
  const [competitionData, setCompetitionData] = useState();
  const [competitionRecord, setCompetitionRecord] = useState();
  const [competitionRecordDetail, setCompetitionRecordDetail] = useState();
  const [myFriends, setMyFriends] = useState();
  const [progress, setProgress] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'score1VS1', title: '결과' },
    { key: 'myScore', title: '내 점수' },
    { key: 'invite', title: '초대' },
  ]);
  const [loadingStates, setLoadingStates] = useState({
    details: true,
    record: true,
    recordDetail: true,
  });

  const fetchCompetitionDetail = async () => {
    try {
      const result = await getCompetitionDetail(competitionId);
      setProgress(getCompetitionProgress(result.data));
      setCompetitionData(result.data);
    } catch (error) {
      Alert.alert('경쟁방 상세 정보 조회 실패', error.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, details: false }));
    }
  };

  const fetchCompetitionRecord = async () => {
    try {
      const res = await getCompetitionRecord(competitionId);
      if (res.status === 200) {
        const sortedData = res.data.sort((a, b) => {
          if (a.is_my_record && !b.is_my_record) {
            return -1;
          } else if (!a.is_my_record && b.is_my_record) {
            return 1;
          } else {
            return 0;
          }
        });
        setCompetitionRecord(sortedData);
      }
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, record: false }));
    }
  };

  const fetchCompetitionRecordDetail = async () => {
    try {
      if (isParticipant) {
        const res = await getCompetitionRecordDetail(competitionId);
        if (res.status === 200) {
          setCompetitionRecordDetail(res.data);
        }
      }
    } catch (error) {
      console.log('경쟁방 기록 상세 조회 실패: ', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, recordDetail: false }));
    }
  };

  const fetchMyFriends = async () => {
    try {
      const res = await getMyFriends();
      if (res.status === 200) {
        setMyFriends(res.data);
      }
    } catch (error) {
      Alert.alert('Error fetching friends:', error.message);
    }
  };

  const fetchAllData = useCallback(async () => {
    try {
      await Promise.all([
        fetchCompetitionDetail(),
        fetchCompetitionRecord(),
        fetchCompetitionRecordDetail(),
        fetchMyFriends(),
      ]);
    } catch (error) {
      Alert.alert('Error fetching friends:', error.message);
    }
  }, [competitionId]);

  useEffect(() => {
    fetchAllData();
  }, [competitionId]);

  useEffect(() => {
    console.log(progress);
    if (progress === 'BEFORE' && isParticipant) {
      setRoutes([
        { key: 'score1VS1', title: '결과' },
        { key: 'myScore', title: '내 점수' },
        { key: 'invite', title: '초대' },
      ]);
    } else {
      setRoutes([
        { key: 'score1VS1', title: '결과' },
        { key: 'myScore', title: '내 점수' },
      ]);
    }
  }, [progress, isParticipant]);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'score1VS1':
        return loadingStates.record ? (
          <SkeletonLoader type="rankList" />
        ) : (
          <Score1VS1 data={competitionRecord} progress={progress} jumpTo={jumpTo} />
        );
      case 'myScore':
        return loadingStates.recordDetail ? (
          <SkeletonLoader type="myScore" />
        ) : (
          <MyScore data={competitionRecordDetail} />
        );
      case 'invite':
        return <Invite competitionId={competitionId} friends={myFriends} jumpTo={jumpTo} />;
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      {loadingStates.details ? (
        <SkeletonLoader type="header" />
      ) : (
        competitionData && <CompetitionRoomHeader data={competitionData} />
      )}
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            activeColor={COLORS.white}
            inactiveColor={COLORS.lightGrey}
            labelStyle={{ fontSize: FONT_SIZES.md, fontFamily: FONTS.PRETENDARD[600] }}
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

export default CompetitionRoom1VS1;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
});
