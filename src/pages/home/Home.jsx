import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../../components/CustomButton';
import CustomCard from '../../components/CustomCardComponent';
import HeaderComponents from '../../components/HeaderComponents';
import HeatmapCalendar from '../../components/HeatMapCalendar';
import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../constants/font';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING, SPACING } from '../../constants/space';
import useUserStore from '../../store/sign/login';
import { formDate } from '../../utils/date';

const userData = {
  nickname: '따잇',
  profile: 'https://ipsf.net/wp-content/uploads/2021/12/dummy-image-square-300x300.webp',
};

const dummyMyCompetitions = [
  {
    id: 1,
    title: '1:1 헬스 대결 붙을사람!!',
    max_members: 2, // 1:1 경쟁
    current_members: 2,
    competition_type: '헬스',
    competition_theme: '스쿼트 내기',
    start_date: '2024-08-25T09:00:00', // 경쟁 시작 날짜 (시간)
    end_date: '2024-08-30T18:00:00', // 경쟁 종료 날짜
  },
];

const highlightData = [
  { date: '2024-08-05', value: 50 },
  { date: '2024-08-10', value: 80 },
  { date: '2024-08-15', value: 30 },
  { date: '2024-08-20', value: 70 },
  { date: '2024-08-25', value: 90 },
];

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(dummyMyCompetitions);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponents icon="home" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImg} source={{ uri: userData.profile }} />
          <View style={styles.textWrapper}>
            <Text style={styles.lgBoldText}>{`${userData.nickname}님,`}</Text>
            <Text style={styles.mdText}>안녕하세요</Text>
          </View>
        </View>
        <Text style={styles.titleText}>진행중인 경쟁</Text>
        {data?.length > 0 ? (
          data.map((item) => <CompetitionItem key={item.id} item={item} onPress={() => {}} />)
        ) : (
          <NoOngoingCompetitions />
        )}
        <Text style={styles.titleText}> 운동 요약 </Text>
        <View style={styles.cardContainer}>
          <Text style={styles.mdBoldText}>8월에는 운동을 얼마나 했을까요? </Text>
          <HeatmapCalendar year={2024} month={8} squareGap={8} highlightData={highlightData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CompetitionItem = React.memo(({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.competitionContainer}>
    <Text style={styles.competitionName}>{item.title}</Text>
    <Text style={styles.competitionDate}>
      {formDate(item.start_date)} ~ {formDate(item.end_date)}
    </Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.xs }}>
      <Ionicons name="person" size={16} color={COLORS.semiLightGrey} />
      <Text style={styles.competitionMembers}>
        {item.current_members} / {item.max_members}
      </Text>
    </View>
  </TouchableOpacity>
));

const NoOngoingCompetitions = () => (
  <View style={styles.cardContainer}>
    <Text style={styles.boldText}>
      {'아직 진행중인 경쟁이 없네요..\n언른 '}
      <Text style={styles.highlightText}>따잇</Text>
      {'하러 가보실까요?'}
    </Text>
    <CustomButton text="+ 새로운 경쟁" theme="primary" size="medium" />
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  scrollViewContent: {
    paddingBottom: 120, //바텀탭
    ...LAYOUT_PADDING,
    ...ELEMENT_VERTICAL_MARGIN,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
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
  mdBoldText: {
    alignSelf: 'stretch',
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  },
  titleText: {
    fontSize: HEADER_FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    ...ELEMENT_VERTICAL_MARGIN,
  },
  cardContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  boldText: {
    alignSelf: 'stretch',
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    paddingHorizontal: 40,
    textAlign: 'center',
  },
  highlightText: {
    color: COLORS.primary,
  },
  competitionContainer: {
    backgroundColor: COLORS.darkGrey,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    borderRadius: 24,
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  competitionName: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
  },
  competitionDate: {
    color: COLORS.semiLightGrey,
    fontSize: FONT_SIZES.sm,
  },
  competitionMembers: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
  },
});

export default Home;
