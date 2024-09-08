import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import {
  deleteCompetition,
  enterCompetition,
  getCompetitionDetail,
  getCompetitionRecord,
  getCompetitionRecordDetail,
  leaveCompetition,
} from '../../apis/competition';
import { getMyFriends } from '../../apis/friend';
import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import CustomAlert from '../../components/CustomAlert';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/font';
import { getCompetitionProgress } from '../../utils/competition';
import Invite from './rankingPageTabs/Invite';
import MyScore from './rankingPageTabs/MyScore';
import RankList from './rankingPageTabs/RankList';

/* eslint-disable */

const CompetitionRoomRanking = ({ navigation }) => {
  const layout = useWindowDimensions();
  const route = useRoute();
  const { competitionId } = route.params;
  const [competitionData, setCompetitionData] = useState();
  const [competitionRecord, setCompetitionRecord] = useState();
  const [competitionRecordDetail, setCompetitionRecordDetail] = useState();
  const [myFriends, setMyFriends] = useState();
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'rankList', title: '랭킹' },
    { key: 'myScore', title: '내 점수' },
    { key: 'invite', title: '초대' },
  ]);
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    onConfirm: null,
    showCancel: true,
  });

  const fetchCompetitionDetail = async () => {
    try {
      const result = await getCompetitionDetail(competitionId);
      setProgress(getCompetitionProgress(result.data));
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
    if (isDeleted) return;
    setLoading(true);
    try {
      await Promise.all([
        fetchCompetitionDetail(),
        fetchCompetitionRecord(),
        fetchCompetitionRecordDetail(),
        fetchMyFriends(),
      ]);
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

  useEffect(() => {
    console.log(progress);
    if (progress === 'BEFORE') {
      setRoutes([
        { key: 'rankList', title: '랭킹' },
        { key: 'myScore', title: '내 점수' },
        { key: 'invite', title: '초대' },
      ]);
    } else {
      setRoutes([
        { key: 'rankList', title: '랭킹' },
        { key: 'myScore', title: '내 점수' },
      ]);
    }
  }, [progress]);

  const handleJoin = async () => {
    try {
      const res = await enterCompetition(competitionId);
      if (res.status === 200) {
        // TODO: toast 메세지 적용
        Alert.alert('성공', '경쟁방에 참여했습니다!');
        fetchAllData();
      }
    } catch (error) {
      console.log('error: ', error);
      // TODO: toast 메세지 적용
      Alert.alert('오류', '경쟁방에 참여에 실패했습니다!');
    }
  };

  const showAlert = (config) => {
    setAlertConfig({ ...config, visible: true });
  };

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const handleLeave = () => {
    const isHost = competitionData?.user_status.is_host;

    if (isHost) {
      showAlert({
        title: '잠깐! 🚨',
        message: `방장님, 여기서 나가시면 안돼요! 😅\n\n경쟁방을 떠나고 싶다면\n삭제 버튼을 찾아주세요 🔍\n\n( 경쟁방이 사라져요, 신중하게! )`,
        showCancel: false,
        onConfirm: hideAlert,
      });
    } else {
      showAlert({
        title: '앗, 잠깐만요! 🏃‍♂️💨',
        message: `정말 떠나실 건가요? 😢\n지금 나가면 경쟁에 참가할 수 없어요!`,
        onConfirm: async () => {
          try {
            const res = await leaveCompetition(competitionId);
            if (res.status === 200) {
              hideAlert();
              navigation.goBack();
            }
          } catch (error) {
            console.log('경쟁방 나가기 실패', error);
            showAlert({
              title: '앗, 문제 발생! 😓',
              message: '경쟁방 나가기에 실패했어요.\n잠시 후 다시 시도해 주세요!',
              showCancel: false,
              onConfirm: hideAlert,
            });
          }
        },
      });
    }
  };

  const handleDelete = () => {
    showAlert({
      title: '잠깐! 🚨',
      message: `정말 이 경쟁방을 없애실 건가요?\n삭제하면 모든 기록이 사라져요 😢😢\n\n참가자들에게도 영향이 갈 수 있어요!`,
      onConfirm: async () => {
        try {
          await deleteCompetition(competitionId);
          setIsDeleted(true);
          navigation.goBack();
        } catch (error) {
          console.log('경쟁방 삭제 실패', error);
          showAlert({
            title: '앗, 문제 발생! 😓',
            message: '경쟁방 삭제에 실패했어요.\n잠시 후 다시 시도해 주세요!',
            showCancel: false,
            onConfirm: hideAlert,
          });
        }
      },
      onCancel: hideAlert,
    });
  };

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'rankList':
        return (
          <RankList
            data={competitionRecord}
            competitionData={competitionData}
            progress={progress}
            onJoin={handleJoin}
            onLeave={handleLeave}
            jumpTo={jumpTo}
          />
        );
      case 'myScore':
        return <MyScore data={competitionRecordDetail} jumpTo={jumpTo} />;
      case 'invite':
        return <Invite competitionId={competitionId} friends={myFriends} jumpTo={jumpTo} />;
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
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={alertConfig.onConfirm}
        onCancel={hideAlert}
        showCancel={alertConfig.showCancel !== false}
        goBackOnConfirm={alertConfig.goBackOnConfirm}
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
