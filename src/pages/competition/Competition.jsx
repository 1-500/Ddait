import React, { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { dummyMyCompetitions } from '../../apis/dummydata';
import CustomButton from '../../components/CustomButton';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS, HEADER_FONT_SIZES } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';
import { formDate } from '../../utils/date';

const CompetitionItem = React.memo(({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.competitionContainer}>
    <Text style={styles.competitionName}>{item.name}</Text>
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

const Competition = ({ navigation }) => {
  const handleCompetitionPress = useCallback(
    (item) => {
      if (item.max_members === 2) {
        navigation.navigate('CompetitionRoom1VS1', { competitionId: item.id });
      } else {
        navigation.navigate('CompetitionRoomRanking', { competitionId: item.id });
      }
    },
    [navigation],
  );

  const renderCompetitions = useCallback(
    ({ item }) => <CompetitionItem item={item} onPress={handleCompetitionPress} />,
    [handleCompetitionPress],
  );

  const ListHeader = () => (
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
  );

  const ListFooter = () => (
    <View style={{ marginTop: SPACING.sm, marginBottom: 100 }}>
      <CustomButton
        theme="primary"
        size="large"
        text="+ 새로운 경쟁"
        onPress={() => navigation.navigate('CompetitionCreation')}
      />
    </View>
  );

  const ListEmpty = useCallback(
    () => (
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>아직 경쟁이 없네요...{'\n'}얼른 따잇! 하러 가보실까요?</Text>
        <CustomButton
          theme="primary"
          size="large"
          text="+ 새로운 경쟁"
          onPress={() => navigation.navigate('CompetitionCreation')}
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
          data={dummyMyCompetitions}
          renderItem={renderCompetitions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: SPACING.md }}
          ListFooterComponent={dummyMyCompetitions.length > 0 ? ListFooter : null}
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
    fontFamily: FONTS.PRETENDARD[700],
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
    fontFamily: FONTS.PRETENDARD[400],
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
    fontFamily: FONTS.PRETENDARD[600],
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
    fontFamily: FONTS.PRETENDARD[600],
  },
  competitionDate: {
    color: COLORS.semiLightGrey,
    fontFamily: FONTS.PRETENDARD[400],
  },
  competitionMembers: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
  },
});

export default Competition;
