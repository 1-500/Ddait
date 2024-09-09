import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import {
  deleteCompetition,
  enterCompetition,
  getCompetitionDetail,
  getCompetitionRecord,
  getCompetitionRecordDetail,
  leaveCompetition,
} from '../../apis/competition';
import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import CustomAlert from '../../components/CustomAlert';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/font';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';
import { getCompetitionProgress } from '../../utils/competition';
import Invite from './rankingPageTabs/Invite';
import MyScore from './rankingPageTabs/MyScore';
import RankList from './rankingPageTabs/RankList';
import SkeletonLoader from './rankingPageTabs/SkeletonLoader';

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
  const [progress, setProgress] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [index, setIndex] = useState(0);
  const { showToast } = useToastMessageStore();
  const [routes] = useState([
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
        console.log(res);
        setCompetitionRecord(res.data);
      }
    } catch (error) {
      console.log('경쟁방 기록 조회 실패: ', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, record: false }));
    }
  };

  const fetchCompetitionRecordDetail = async () => {
    try {
      const res = await getCompetitionRecordDetail(competitionId);
      if (res.status === 200) {
        setCompetitionRecordDetail(res.data);
      }
    } catch (error) {
      console.log('경쟁방 기록 상세 조회 실패: ', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, recordDetail: false }));
    }
  };

  const fetchAllData = useCallback(() => {
    if (isDeleted) return;
    setLoadingStates({ details: true, record: true, recordDetail: true });
    fetchCompetitionDetail();
    fetchCompetitionRecord();
    fetchCompetitionRecordDetail();
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
        showToast('경쟁방에 참여했습니다!', 'success', 3000, 'top');
        fetchAllData();
      }
    } catch (error) {
      console.log('error: ', error);
      showToast('경쟁방 참여에 실패했습니다.', 'error', 3000, 'top');
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
    const alertConfig = {
      title: isHost ? '잠깐! 🚨' : '앗, 잠깐만요! 🏃‍♂️💨',
      message: isHost
        ? `방장님이 나가시면 기록이 삭제됩니다 🥹\n경쟁방이 사라져요, 신중하게!`
        : `정말 떠나실 건가요? 😢\n지금 나가면 경쟁에 참가할 수 없어요!`,
      onConfirm: async () => {
        try {
          if (isHost) {
            await deleteCompetition(competitionId);
            hideAlert();
            showToast('경쟁방이 삭제되었습니다.', 'error', 3000, 'top');
          } else {
            const res = await leaveCompetition(competitionId);
            if (res.status !== 200) throw new Error('Leave failed');
            hideAlert();
            showToast('경쟁방에서 나왔습니다.', 'success', 3000, 'top');
          }
          setIsDeleted(true);
          navigation.goBack();
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
      onCancel: hideAlert,
    };

    showAlert(alertConfig);
  };

  const handleDelete = () => {
    showAlert({
      title: '잠깐! 🚨',
      message: `정말 이 경쟁방을 없애실 건가요?\n삭제하면 모든 기록이 사라져요 😢😢\n\n참가자들에게도 영향이 갈 수 있어요!`,
      onConfirm: async () => {
        try {
          await deleteCompetition(competitionId);
          setIsDeleted(true);
          hideAlert();
          showToast('경쟁방이 삭제되었습니다.', 'error', 3000, 'top');
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
        return loadingStates.record ? (
          <SkeletonLoader type="rankList" />
        ) : (
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
        return loadingStates.recordDetail ? (
          <SkeletonLoader type="myScore" />
        ) : (
          <MyScore data={competitionRecordDetail} />
        );
      case 'invite':
        return <Invite friends={dummy_data.friends} />;
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      {loadingStates.details ? (
        <SkeletonLoader type="header" />
      ) : (
        competitionData && <CompetitionRoomHeader data={competitionData} onDelete={handleDelete} />
      )}
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
