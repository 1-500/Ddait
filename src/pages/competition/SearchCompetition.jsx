import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { dummyCompetitions } from '../../apis/dummydata';
import CustomButton from '../../components/CustomButton';
import CustomTag from '../../components/CustomTag';
import DropdownModal from '../../components/DropdownModal';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';
import { formDate } from '../../utils/date';

// 경쟁방 아이템 컴포넌트
const CompetitionItem = React.memo(({ item }) => (
  <View style={styles.competitionContainer}>
    <View style={{ gap: SPACING.xs }}>
      <Text style={styles.competitionName}>{item.name}</Text>
      <View style={{ flexDirection: 'row', gap: SPACING.xxs }}>
        {item.tags.map((tag, index) => (
          <CustomTag key={index} size="small" text={tag} />
        ))}
      </View>
      <Text style={styles.competitionDate}>
        {formDate(item.start_date)} ~ {formDate(item.end_date)}
      </Text>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.xs }}>
      <Ionicons name="person" size={16} color={COLORS.semiLightGrey} />
      <Text style={styles.competitionMembers}>
        {item.current_members} / {item.max_members}
      </Text>
    </View>
  </View>
));

const SearchCompetition = ({ navigation }) => {
  const [sortBy, setSortBy] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortedCompetitions, setSortedCompetitions] = useState(dummyCompetitions);

  // 경쟁방 정렬 및 필터링
  const sortCompetitions = useCallback((competitions, sortBy) => {
    if (sortBy === '최신순') {
      return [...competitions].sort((a, b) => {
        return new Date(b.start_date) - new Date(a.start_date);
      });
    } else if (sortBy === '인기순') {
      return [...competitions].sort((a, b) => b.current_members - a.current_members);
    }
    return competitions;
  }, []);

  const filterCompetitions = useCallback((competitions, tags) => {
    if (tags.length === 0) {
      return competitions;
    }
    return competitions.filter((competition) => tags.every((tag) => competition.tags.includes(tag)));
  }, []);

  useEffect(() => {
    let filtered = filterCompetitions(dummyCompetitions, selectedTags);
    let sorted = sortCompetitions(filtered, sortBy);
    setSortedCompetitions(sorted);
  }, [sortBy, sortCompetitions, selectedTags, filterCompetitions]);

  const toggleTag = (tag) => {
    setSelectedTags((prevTags) => (prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]));
  };

  // 랜더링 관련
  const renderCompetitions = useCallback(({ item }) => <CompetitionItem item={item} />, []);

  const ListEmpty = useCallback(
    () => (
      <View style={styles.cardContainer}>
        <Text style={styles.cardText}>진행중인 경쟁이 없네요...(｡•́︿•̀｡){'\n'}얼른 따잇! 하러 가보실까요?</Text>
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
              <TouchableOpacity key={tag} onPress={() => toggleTag(tag)}>
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
});

export default SearchCompetition;
