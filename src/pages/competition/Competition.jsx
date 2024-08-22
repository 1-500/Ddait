import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../../components/CustomButton';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const profile = require('../../assets/images/profile.png');

// 더미 데이터
const dummyCompetitions = [
  {
    id: '1',
    name: '스쿼트 챌린지 들어오세요!',
    start_date: '23.08.01',
    end_date: '23.09.01',
    current_members: 3,
    max_members: 10,
  },
  {
    id: '2',
    name: '30일 플랭크 도전!!!!',
    start_date: '23.08.15',
    end_date: '23.09.15',
    current_members: 5,
    max_members: 8,
  },
  {
    id: '3',
    name: '매일 5km 달리기 🏃‍♂️',
    start_date: '23.09.01',
    end_date: '23.10.01',
    current_members: 2,
    max_members: 15,
  },
  {
    id: '4',
    name: '스쿼트 챌린지 들어오세요!',
    start_date: '23.08.01',
    end_date: '23.09.01',
    current_members: 3,
    max_members: 10,
  },
  {
    id: '5',
    name: '30일 플랭크 도전!!!!',
    start_date: '23.08.15',
    end_date: '23.09.15',
    current_members: 5,
    max_members: 8,
  },
  {
    id: '6',
    name: '매일 5km 달리기 🏃‍♂️',
    start_date: '23.09.01',
    end_date: '23.10.01',
    current_members: 2,
    max_members: 15,
  },
  {
    id: '7',
    name: '스쿼트 챌린지 들어오세요!',
    start_date: '23.08.01',
    end_date: '23.09.01',
    current_members: 3,
    max_members: 10,
  },
  {
    id: '8',
    name: '30일 플랭크 도전!!!!',
    start_date: '23.08.15',
    end_date: '23.09.15',
    current_members: 5,
    max_members: 8,
  },
  {
    id: '9',
    name: '매일 5km 달리기 🏃‍♂️',
    start_date: '23.09.01',
    end_date: '23.10.01',
    current_members: 2,
    max_members: 15,
  },
];

const Competition = ({ navigation }) => {
  const renderCompetitions = ({ item }) => (
    <View style={styles.competitionContainer}>
      <Text style={styles.competitionName}>{item.name}</Text>
      <Text style={styles.competitionDate}>
        {item.start_date} ~ {item.end_date}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.xxs }}>
        <Image source={profile} style={{ width: 20, height: 20 }} />
        <Text style={styles.competitionMembers}>
          {item.current_members} / {item.max_members}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ ...LAYOUT_PADDING, gap: SPACING.xl }}>
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>따잇님,</Text>
              <Text style={{ fontSize: 50 }}>🏋️</Text>
            </View>
            <Text style={styles.subHeader}>오늘의 경쟁 상황을 확인해보세요!</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <CustomButton
              theme="primary"
              size="medium"
              text="+ 다른 경쟁도 볼래요"
              onPress={() => navigation.navigate('SearchCompetition')}
            />
          </View>

          {dummyCompetitions.length > 0 ? (
            <View>
              <FlatList
                data={dummyCompetitions}
                renderItem={renderCompetitions}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: SPACING.md }}
                scrollEnabled={false}
                nestedScrollEnabled={true}
              />
              <View style={{ marginTop: SPACING.lg, marginBottom: 80 }}>
                <CustomButton
                  theme="primary"
                  size="large"
                  text="+ 새로운 경쟁"
                  onPress={() => navigation.navigate('CreateCompetition')}
                />
              </View>
            </View>
          ) : (
            <View style={styles.cardContainer}>
              <Text style={styles.cardText}>아직 경쟁이 없네요...{'\n'}얼른 따잇! 하러 가보실까요?</Text>
              <CustomButton
                theme="primary"
                size="large"
                text="+ 새로운 경쟁"
                onPress={() => navigation.navigate('CreateCompetition')}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: COLORS.white,
    fontSize: HEADER_FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACING.xxs,
  },
  subHeader: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    marginTop: SPACING.xxs,
    marginBottom: SPACING.xxs,
  },
  cardContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.darkGrey,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 30,
    borderRadius: RADIUS.large,
    gap: SPACING.lg,
  },
  cardText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    marginBottom: SPACING.xxs,
    lineHeight: FONT_SIZES.md * 1.3,
  },
  competitionContainer: {
    backgroundColor: COLORS.darkGrey,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    borderRadius: RADIUS.large,
    gap: SPACING.xs,
  },
  competitionName: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  competitionDate: {
    color: COLORS.semiLightGrey,
  },
  competitionMembers: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
  },
});

export default Competition;
