import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CustomButton from '../../components/CustomButton';
import CustomCard from '../../components/CustomCardComponent';
import HeaderComponents from '../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../constants/font';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING } from '../../constants/space';

const userData = {
  nickname: '따잇',
  profile: 'https://ipsf.net/wp-content/uploads/2021/12/dummy-image-square-300x300.webp',
};
const dummyMyCompetitions = [
  // {
  //   id: 1,
  //   title: '1:1 헬스 대결 붙을사람!!',
  //   max_members: 2, // 1:1 경쟁
  //   current_members: 2,
  //   competition_type: '헬스',
  //   competition_theme: '스쿼트 내기',
  //   start_date: '2024-08-25T09:00:00', // 경쟁 시작 날짜 (시간)
  //   end_date: '2024-08-30T18:00:00', // 경쟁 종료 날짜
  // },
  // {
  //   id: 2,
  //   title: '랭킹전 러닝 대회',
  //   max_members: 10, // 랭킹전
  //   current_members: 5,
  //   competition_type: '러닝',
  //   competition_theme: '5km 달리기',
  //   start_date: '2024-09-01T06:00:00', // 경쟁 시작 날짜 (시간)
  //   end_date: '2024-09-10T20:00:00', // 경쟁 종료 날짜
  // },
  // {
  //   id: 3,
  //   title: '3대 500 내기',
  //   max_members: 5, // 랭킹전
  //   current_members: 4,
  //   competition_type: '헬스',
  //   competition_theme: '3대 내기',
  //   start_date: '2024-08-22T12:00:00', // 경쟁 시작 날짜 (시간)
  //   end_date: '2024-08-29T15:00:00', // 경쟁 종료 날짜
  // },
];
import { getTest } from '../../apis/home';
import useUserStore from '../../store/sign/login';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(dummyMyCompetitions);
  }, []); //더미데이터로 널/널아닐때 일단 구분
  /* eslint-disable */
  const { token } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTest();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    /* eslint-enable */
    fetchData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <HeaderComponents icon="none" title="홈" />
      <ScrollView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImg} source={{ uri: userData.profile }} />
          <View style={styles.textWrapper}>
            <Text style={styles.lgBoldText}>{`${userData.nickname}님,`}</Text>
            <Text style={styles.mdText}>안녕하세요</Text>
          </View>
        </View>
        <Text style={styles.titleText}> 진행중인 경쟁 </Text>
        {data.length > 0 ? (
          data.map((item) => (
            <CustomCard
              key={item?.id}
              title={item?.title}
              tags={[{ label: item?.competition_type, category: 'weight' }]}
              additionalInfo={`${item?.current_members}/${item?.max_members}`}
              footer={`${item?.start_date.split('T')[0]} ~ ${item?.end_date.split('T')[0]}`}
            />
          ))
        ) : (
          <NoOngoingCompetitions />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const NoOngoingCompetitions = () => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.boldText}>
        {'아직 진행중인 경쟁이 없네요..\n언른 '}
        <Text style={styles.highlightText}>따잇</Text>
        {'하러 가보실까요?'}
      </Text>
      <CustomButton text="+ 새로운 경쟁" theme="primary" size="medium" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 200,
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
  cardContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: 24,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  titleText: {
    fontSize: HEADER_FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    ...ELEMENT_VERTICAL_MARGIN,
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
  boldText: {
    alignSelf: 'stretch',
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    paddingHorizontal: 40,
  },
  highlightText: {
    color: COLORS.primary,
  },
});
