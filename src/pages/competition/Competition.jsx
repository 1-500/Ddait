import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { getMyCompetition } from '../../apis/competition';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import CustomButton from '../../components/CustomButton';
import MyCompetitionItem from '../../components/MyCompetitionItem';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS, HEADER_FONT_SIZES } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';
import useUserStore from '../../store/sign/login';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';
import { getCompetitionProgress } from '../../utils/competition';

const Competition = ({ navigation }) => {
  const { showToast } = useToastMessageStore();
  const [myCompetitions, setMyCompetitions] = useState([]);
  const [activeCompetitions, setActiveCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nickname = useUserStore((state) => state.nickname);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchMyCompetitions = async () => {
      setIsLoading(true);
      try {
        const result = await getMyCompetition();
        setMyCompetitions(result.data);

        const active = result.data.filter((data) => getCompetitionProgress(data) !== 'AFTER');
        setActiveCompetitions(active);
      } catch (error) {
        showToast('내 경쟁방 목록을 불러오는데 실패했습니다', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyCompetitions();
  }, [isFocused, showToast]);

  const handleCompetitionPress = useCallback(
    (item) => {
      if (item.info.max_members === 2) {
        navigation.navigate('CompetitionRoom1VS1', { competitionId: item.id, isParticipant: true });
      } else {
        navigation.navigate('CompetitionRoomRanking', { competitionId: item.id, isParticipant: true });
      }
    },
    [navigation],
  );

  const renderCompetitions = useCallback(
    ({ item }) =>
      isLoading ? (
        <SkeletonLoader type="competitionItem" />
      ) : (
        <MyCompetitionItem item={item} onPress={handleCompetitionPress} />
      ),
    [isLoading, handleCompetitionPress],
  );

  const ListHeader = useMemo(
    () => () => (
      <View style={{ marginTop: SPACING.lg }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{nickname}님,</Text>
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
    [nickname, navigation],
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
          data={isLoading ? [...Array(1)] : activeCompetitions}
          renderItem={renderCompetitions}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: SPACING.md }}
          ListFooterComponent={activeCompetitions.length > 0 ? ListFooter : null}
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
});

export default Competition;
