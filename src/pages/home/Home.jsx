import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import HeaderComponents from '../../components/HeaderComponents';
import HeatmapCalendar from '../../components/HeatMapCalendar';
import MyCompetitionItem from '../../components/MyCompetitionItem';
import NoOngoingCompetitions from '../../components/NoOngoingCompetitions';
import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING, SPACING } from '../../constants/space';

const userData = {
  nickname: '따잇',
  profile: 'https://ipsf.net/wp-content/uploads/2021/12/dummy-image-square-300x300.webp',
};

const dummyMyCompetitions = [
  {
    id: 1,
    title: '1:1 헬스 대결 붙을사람!!',
    max_members: 2,
    current_members: 2,
    competition_type: '헬스',
    competition_theme: '스쿼트 내기',
    start_date: '2024-08-25T09:00:00',
    end_date: '2024-08-30T18:00:00',
  },
];

const dummyDates = [
  { date: '2024-08-05', value: 50 },
  { date: '2024-08-10', value: 80 },
  { date: '2024-08-15', value: 30 },
  { date: '2024-08-20', value: 70 },
  { date: '2024-08-25', value: 90 },
];

const Home = ({ navigation }) => {
  const competition = dummyMyCompetitions[0]; // Directly access the first item

  const handleCompetitionPress = (item) => {
    if (item.max_members === 2) {
      navigation.navigate('CompetitionRoom1VS1', { competitionId: item.id });
    } else {
      navigation.navigate('CompetitionRoomRanking', { competitionId: item.id });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponents icon="home" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ProfileSection data={userData} />
        <SectionTitle title="진행중인 경쟁" navigation={navigation} navigateTo="Competition" />
        {competition ? (
          <MyCompetitionItem item={competition} onPress={handleCompetitionPress} />
        ) : (
          <NoOngoingCompetitions />
        )}
        <SectionTitle title="운동 요약" navigation={navigation} navigateTo="Mypage" />
        <ExerciseSummary data={dummyDates} />
      </ScrollView>
    </SafeAreaView>
  );
};

const ProfileSection = ({ data }) => (
  <View style={styles.profileContainer}>
    <Image style={styles.profileImg} source={{ uri: data.profile }} />
    <View style={styles.textWrapper}>
      <Text style={styles.lgBoldText}>{`${data.nickname}님,`}</Text>
      <Text style={styles.mdText}>안녕하세요</Text>
    </View>
  </View>
);
const SectionTitle = ({ title, navigation, navigateTo }) => (
  <View style={styles.titleWrapper}>
    <Text style={styles.titleText}>{title}</Text>
    <Pressable
      onPress={() => navigation.navigate(navigateTo)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text style={styles.moreText}>더보기</Text>
    </Pressable>
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
    gap: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  textWrapper: {
    flexDirection: 'column',
  },
  lgBoldText: {
    color: COLORS.white,
    fontSize: HEADER_FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
  },
  mdText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...ELEMENT_VERTICAL_MARGIN,
  },
  titleText: {
    fontSize: HEADER_FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  moreText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
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
    fontWeight: FONT_WEIGHTS.bold,
  },
});

export default Home;
