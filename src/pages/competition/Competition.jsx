import React, { useCallback, useMemo } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { dummyCompetitions } from '../../apis/dummydata';
import CustomButton from '../../components/CustomButton';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const CompetitionItem = React.memo(({ item }) => (
  <View style={styles.competitionContainer}>
    <Text style={styles.competitionName}>{item.name}</Text>
    <Text style={styles.competitionDate}>
      {item.start_date} ~ {item.end_date}
    </Text>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.xs }}>
      <Ionicons name="person" size={16} color={COLORS.semiLightGrey} />
      <Text style={styles.competitionMembers}>
        {item.current_members} / {item.max_members}
      </Text>
    </View>
  </View>
));

const Competition = ({ navigation }) => {
  const renderCompetitions = useCallback(({ item }) => <CompetitionItem item={item} />, []);

  const ListHeader = useMemo(
    () => (
      <View style={{ marginTop: SPACING.lg }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>따잇님,</Text>
          <Text style={{ fontSize: 50 }}>🏋️</Text>
        </View>
        <Text style={styles.subHeader}>오늘의 경쟁 상황을 확인해보세요!</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: SPACING.xs }}>
          <CustomButton
            theme="primary"
            size="medium"
            text="+ 다른 경쟁도 볼래요"
            onPress={() => navigation.navigate('SearchCompetition')}
          />
        </View>
      </View>
    ),
    [navigation],
  );

  const ListFooter = useCallback(
    () => (
      <View ew style={{ marginTop: SPACING.sm, marginBottom: 100 }}>
        <CustomButton
          theme="primary"
          size="large"
          text="+ 새로운 경쟁"
          onPress={() => navigation.navigate('CreateCompetition')}
        />
      </View>
    ),
    [navigation],
  );

  const ListEmpty = useCallback(
    () => (
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>아직 경쟁이 없네요...{'\n'}얼른 따잇! 하러 가보실까요?</Text>
        <CustomButton
          theme="primary"
          size="large"
          text="+ 새로운 경쟁"
          onPress={() => navigation.navigate('CreateCompetition')}
        />
      </View>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <View style={{ ...LAYOUT_PADDING }}>
        <FlatList
          ListHeaderComponent={ListHeader}
          data={dummyCompetitions}
          renderItem={renderCompetitions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: SPACING.md }}
          ListFooterComponent={dummyCompetitions.length > 0 ? ListFooter : null}
          ListEmptyComponent={ListEmpty}
        />
      </View>
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
    marginBottom: SPACING.xl,
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
