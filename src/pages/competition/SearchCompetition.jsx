import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        <Text style={styles.competitionTitle}>{item.title}</Text>
        <View style={{ flexDirection: 'row', gap: SPACING.xxs }}>
          <CustomTag size="small" text={item.info.competition_type} />
          <CustomTag size="small" text={item.info.competition_theme} />
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
  const [sortBy, setSortBy] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortedCompetitions, setSortedCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const result = await getAllCompetitions();
        setSortedCompetitions(result.data);
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

  // 경쟁방 정렬 및 필터링
  const sortCompetitions = useCallback((competitions, sortBy) => {
    if (sortBy === '최신순') {
      return [...competitions].sort((a, b) => {
        return new Date(b.date.start_date) - new Date(a.date.start_date);
      });
    } else if (sortBy === '인기순') {
      return [...competitions].sort((a, b) => b.info.current_members - a.info.current_members);
    }
    return competitions;
  }, []);

  const filterCompetitions = useCallback((competitions, tags) => {
    if (tags.length === 0) {
      return competitions;
    }
    return competitions.filter((competition) =>
      tags.some(
        (tag) => competition.info.competition_type.includes(tag) || competition.info.competition_theme.includes(tag),
      ),
    );
  }, []);

  useEffect(() => {
    if (sortedCompetitions.length > 0) {
      let filtered = filterCompetitions(sortedCompetitions, selectedTags);
      let sorted = sortCompetitions(filtered, sortBy);
      setSortedCompetitions(sorted);
    }
  }, [sortBy, sortCompetitions, selectedTags, filterCompetitions, sortedCompetitions]);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) => (prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]));
  };

  // 랜더링 관련
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
            {['웨이트', '러닝', '다이어트'].map((tag) => (
              <TouchableOpacity key={tag} onPress={() => toggleTag(tag)} activeOpacity={0.6}>
                <CustomTag
                  size="big"
                  text={tag}
                  style={[styles.sortTag, selectedTags.includes(tag) && styles.selectedSortTag]}
                />
              </TouchableOpacity>
            ))}
          </View>
          {/* 정렬 옵션 */}
          <DropdownModal
            options={['최신순', '인기순']}
            onChange={setSortBy}
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
  sortTag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: '#404040',
  },
  selectedSortTag: {
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
