import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import { getAllCompetitions } from '../../apis/competition';
import CustomButton from '../../components/CustomButton';
import CustomTag from '../../components/CustomTag';
import DropdownModal from '../../components/DropdownModal';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';
import { formDate } from '../../utils/date';

// 경쟁방 아이템 컴포넌트
const CompetitionItem = React.memo(({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.competitionContainer}>
      <View style={{ gap: SPACING.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
          {item.settings.is_private ? (
            <Octicons name="lock" size={16} color={COLORS.lightGrey} />
          ) : (
            <Octicons name="unlock" size={16} color={COLORS.primary} />
          )}
          <Text style={styles.competitionTitle}>{item.title}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: SPACING.xxs }}>
          <CustomTag size="small" text={item.info.competition_type} />
          <CustomTag size="small" text={item.info.competition_theme} style={{ backgroundColor: COLORS.warmGrey }} />
          <CustomTag size="small" text={item.info.max_members === 2 ? '1 : 1' : '랭킹전'} />
        </View>
        <Text style={styles.competitionDate}>
          {formDate(item.date.start_date)} ~ {formDate(item.date.end_date)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.xs }}>
        <Ionicons name="person" size={16} color={COLORS.semiLightGrey} />
        <Text style={styles.competitionMembers}>
          {item.info.current_members} / {item.info.max_members}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const SearchCompetition = ({ navigation }) => {
  const [competitions, setCompetitions] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const result = await getAllCompetitions();
        setCompetitions(result.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('경쟁방 목록을 불러오는 데 실패했습니다:', error);
      }
    };

    fetchCompetitions();
  }, []);

  const handleCompetitionPress = useCallback(
    (item) => {
      if (item.info.max_members === 2) {
        navigation.navigate('CompetitionRoom1V1', { competitionId: item.id });
      } else {
        navigation.navigate('CompetitionRoomRanking', { competitionId: item.id });
      }
    },
    [navigation],
  );

  // 정렬 함수
  const sortCompetitions = useCallback((competitions, sortBy) => {
    switch (sortBy) {
      case '최신순':
        return [...competitions].sort((a, b) => new Date(b.date.start_date) - new Date(a.date.start_date));
      case '인기순':
        return [...competitions].sort((a, b) => b.info.current_members - a.info.current_members);
      case '마감순':
        return [...competitions].sort((a, b) => new Date(a.date.end_date) - new Date(b.date.end_date));
      default:
        return competitions;
    }
  }, []);

  // 정렬 옵션 변경 핸들러
  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
  }, []);

  // 경쟁방 필터링
  const filterCompetitions = useCallback((competitions, tag) => {
    if (!tag) {
      return competitions;
    }
    switch (tag) {
      case '웨이트':
        return competitions.filter((comp) => comp.info.competition_type === '웨이트트레이닝');
      case '랭킹전':
        return competitions.filter((comp) => comp.info.max_members !== 2);
      case '1:1':
        return competitions.filter((comp) => comp.info.max_members === 2);
      default:
        return competitions;
    }
  }, []);

  const filteredCompetitions = useMemo(() => {
    return filterCompetitions(competitions, selectedTag);
  }, [competitions, selectedTag, filterCompetitions]);

  // 필터링 된 데이터를 정렬
  const sortedCompetitions = useMemo(() => {
    return sortCompetitions(filteredCompetitions, sortBy);
  }, [filteredCompetitions, sortBy, sortCompetitions]);

  const toggleTag = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? '' : tag));
  };

  // 랜더링 컴포넌트
  const renderCompetitions = useCallback(
    ({ item }) => <CompetitionItem item={item} onPress={handleCompetitionPress} />,
    [handleCompetitionPress],
  );

  const ListEmpty = useCallback(
    () => (
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>진행중인 경쟁이 없네요...{'\n'}얼른 따잇! 하러 가보실까요? 😎</Text>
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
    <SafeAreaView style={styles.container}>
      <HeaderComponents title="경쟁 찾기" />
      <View style={{ ...LAYOUT_PADDING, flex: 1 }}>
        <View style={styles.sortContainer}>
          {/* 태그 필터 */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {['웨이트', '랭킹전', '1:1'].map((tag) => (
              <TouchableOpacity key={tag} onPress={() => toggleTag(tag)} activeOpacity={0.6}>
                <CustomTag
                  size="big"
                  text={tag}
                  style={[styles.filterTag, selectedTag.includes(tag) && styles.selectedFilterTag]}
                />
              </TouchableOpacity>
            ))}
          </View>
          {/* 정렬 옵션 */}
          <DropdownModal
            options={['최신순', '인기순', '마감순']}
            onChange={handleSortChange}
            value={sortBy}
            placeholder={'정렬'}
            showIcon={true}
          />
        </View>
        {/* 경쟁 목록 */}
        <FlatList
          data={sortedCompetitions}
          renderItem={renderCompetitions}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: SPACING.md, paddingBottom: 90 }}
          ListEmptyComponent={ListEmpty}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.lg,
  },
  filterTag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: '#404040',
  },
  selectedFilterTag: {
    backgroundColor: COLORS.primary,
  },
  competitionContainer: {
    backgroundColor: COLORS.darkGrey,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  competitionTitle: {
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

export default SearchCompetition;
