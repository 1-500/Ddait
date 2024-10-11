import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import {
  deleteCompetition,
  enterCompetition,
  getCompetitionDetail,
  getCompetitionRecordDetail,
  leaveCompetition,
} from '../../apis/competition';
import { getCompetitionRecord } from '../../apis/competition';
import { getMyFriendsNotParticipant } from '../../apis/friend';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import CustomAlert from '../../components/CustomAlert';
import SkeletonLoader from '../../components/SkeletonLoader';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';
import { getCompetitionProgress } from '../../utils/competition';
import Invite from './rankingPageTabs/Invite';
import MyScore from './rankingPageTabs/MyScore';
import Score1VS1 from './rankingPageTabs/Score1VS1';

/* eslint-disable */

const CompetitionRoom1VS1 = ({ navigation }) => {
  const layout = useWindowDimensions();
  const route = useRoute();
  const { competitionId, isParticipant } = route.params;
  const { showToast } = useToastMessageStore();
  const [competitionData, setCompetitionData] = useState();
  const [competitionRecord, setCompetitionRecord] = useState();
  const [competitionRecordDetail, setCompetitionRecordDetail] = useState();
  const [myFriends, setMyFriends] = useState();
  const [progress, setProgress] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isParticipantState, setIsParticipantState] = useState(isParticipant);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'score1VS1', title: '결과' },
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
      if (isParticipant || isParticipantState) {
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

  const fetchMyFriendsNotParticipant = async () => {
    try {
      if (isParticipant || isParticipantState) {
        const res = await getMyFriendsNotParticipant(competitionId);
        if (res.status === 200) {
          setMyFriends(res.data);
        }
      }
    } catch (error) {
      Alert.alert('Error fetching friends:', error.message);
    }
  };

  const fetchAllData = useCallback(async () => {
    if (isDeleted) return;
    setLoadingStates({ details: true, record: true, recordDetail: true });
    try {
      await Promise.all([
        fetchCompetitionDetail(),
        fetchCompetitionRecord(),
        fetchCompetitionRecordDetail(),
        fetchMyFriendsNotParticipant(),
      ]);
    } catch (error) {
      Alert.alert('Error fetching friends:', error.message);
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
    if (progress === 'BEFORE' && isParticipantState) {
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
  }, [progress, isParticipantState]);

  const showAlert = (config) => {
    setAlertConfig({ ...config, visible: true });
  };

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const handleJoin = async () => {
    try {
      const res = await enterCompetition(competitionId);
      if (res.status === 200) {
        showToast('🎉 새로운 경쟁에 참여하셨습니다!', 'success', 3000, 'top');
        setIsParticipantState(true);
        fetchAllData();
      }
    } catch (error) {
      console.log('error: ', error);
      showToast('🚫 문제 발생! 다시 시도해주세요.', 'error', 3000, 'top');
    }
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
            showToast('💥 경쟁방이 삭제되었습니다.', 'error', 3000, 'top');
          } else {
            const res = await leaveCompetition(competitionId);
            if (res.status !== 200) throw new Error('Leave failed');
            hideAlert();
            showToast('👋 경쟁방에서 나가셨습니다.', 'error', 3000, 'top');
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
          showToast('💥 경쟁방이 삭제되었습니다.', 'error', 3000, 'top');
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
      case 'score1VS1':
        return loadingStates.record ? (
          <SkeletonLoader type="rankList" />
        ) : (
          <Score1VS1
            competitionRecord={competitionRecord}
            setCompetitionRecord={setCompetitionRecord}
            competitionData={competitionData}
            progress={progress}
            isParticipant={isParticipantState}
            onJoin={handleJoin}
            onLeave={handleLeave}
            navigation={navigation}
            jumpTo={jumpTo}
          />
        );
      case 'myScore':
        return loadingStates.recordDetail ? (
          <SkeletonLoader type="myScore" />
        ) : (
          <MyScore data={competitionRecordDetail} navigation={navigation} />
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
        competitionData && <CompetitionRoomHeader data={competitionData} progress={progress} onDelete={handleDelete} />
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

export default CompetitionRoom1VS1;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
});
