import { useIsFocused } from '@react-navigation/native'; // useIsFocused 훅을 import 합니다
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getMyCompetition } from '../../apis/competition/index';
import HeaderComponents from '../../components/HeaderComponents';
import HeatmapCalendar from '../../components/HeatMapCalendar';
import MyCompetitionItem from '../../components/MyCompetitionItem';
import NoOngoingCompetitions from '../../components/NoOngoingCompetitions';
import SectionTitle from '../../components/SectionTitle';
import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS, HEADER_FONT_SIZES } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING, SPACING } from '../../constants/space';
import useUserStore from '../../store/sign/login';

const defaultProfile = require('../../assets/images/default-profile.png');
const dummyDates = [
  { date: '2024-08-05', value: 50 },
  { date: '2024-08-10', value: 80 },
  { date: '2024-08-15', value: 30 },
  { date: '2024-08-20', value: 70 },
  { date: '2024-08-25', value: 90 },
];

const Home = ({ navigation }) => {
  const [competition, setCompetition] = useState();
  const isFocused = useIsFocused(); // 현재 화면이 포커스 상태인지 확인
  const { nickname, profileImageUrl, introduce } = useUserStore();

  const fetchMyCompetitions = async () => {
    try {
      const response = await getMyCompetition();
      const competitions = response.data;
      if (competitions && competitions.length > 0) {
        const now = new Date(); //현재 날짜

        const closestCompetition = competitions.reduce((closest, current) => {
          const currentEndDate = new Date(current.end_date);
          const closestEndDate = new Date(closest.end_date);

          // 오늘과 종료날짜의 차
          const currentDifference = Math.abs(currentEndDate - now);
          const closestDifference = Math.abs(closestEndDate - now);

          // current의 종료 날짜가 더 가까우면 current return
          return currentDifference < closestDifference ? current : closest;
        }, competitions[0]);

        setCompetition(closestCompetition);
      } else {
        setCompetition(null);
      }
    } catch (error) {
      Alert.alert('Error fetching competitions:', error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchMyCompetitions();
    }
  }, [isFocused]);

  const handleCompetitionPress = (item) => {
    if (item.info.max_members === 2) {
      navigation.navigate('CompetitionRoom1VS1', { competitionId: item.id });
    } else {
      navigation.navigate('CompetitionRoomRanking', { competitionId: item.id });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponents icon="home" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ProfileSection data={{ nickname, profileImageUrl, introduce }} />
        <SectionTitle title="진행중인 경쟁" showMore={true} navigation={navigation} navigateTo="Competition" />
        <View style={{ marginBottom: SPACING.md }}>
          {competition ? (
            <MyCompetitionItem item={competition} onPress={handleCompetitionPress} />
          ) : (
            <NoOngoingCompetitions />
          )}
        </View>
        <SectionTitle title="운동 요약" showMore={true} navigation={navigation} navigateTo="Mypage" />
        <ExerciseSummary data={dummyDates} />
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileSection = ({ data }) => (
  <View style={styles.profileContainer}>
    <Image style={styles.profileImg} source={data.profileImageUrl ? { uri: data.profileImageUrl } : defaultProfile} />
    <View style={styles.textWrapper}>
      <Text style={styles.lgBoldText}>{`${data.nickname}님,`}</Text>
      <Text style={styles.introduceText} numberOfLines={1} ellipsizeMode="tail">
        {data.introduce || '따잇에서 나를 소개해볼까요? 👋'}
      </Text>
    </View>
  </View>
);
const ExerciseSummary = ({ data }) => (
  <View style={styles.cardContainer}>
    <Text style={styles.mdBoldText}>8월에는 운동을 얼마나 했을까요?</Text>
    <HeatmapCalendar year={2024} month={8} squareGap={8} highlightData={data} />
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  scrollViewContent: {
    paddingBottom: 120,
    ...LAYOUT_PADDING,
    ...ELEMENT_VERTICAL_MARGIN,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  textWrapper: {
    flexShrink: 1,
    flexDirection: 'column',
    gap: SPACING.xxs,
  },
  lgBoldText: {
    color: COLORS.white,
    fontSize: HEADER_FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
  },
  introduceText: {
    color: COLORS.semiLightGrey,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    lineHeight: FONT_SIZES.sm * 1.5,
  },
  cardContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: RADIUS.large,
    padding: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  mdBoldText: {
    alignSelf: 'stretch',
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[600],
  },
});

export default Home;
