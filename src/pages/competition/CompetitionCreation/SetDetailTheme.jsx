import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
import useCreateRoomStateStore from '../../../store/competition/index';

const themeOptions = {
  웨이트트레이닝: [
    { title: '3대 측정 내기', description: '종목 3개로 대결합니다.', competitionTheme: '3대측정내기' },
    { title: '스쿼트 내기', description: '스쿼트 개수로 경쟁합니다.', competitionTheme: '스쿼트내기' }, // 접근 제한 상태
  ],
  등산: [{ title: '등산 테마', description: '등산 테마에 대한 설명입니다.' }],
  다이어트: [{ title: '다이어트 테마', description: '다이어트 테마에 대한 설명입니다.' }],
  러닝: [{ title: '러닝 테마', description: '러닝 테마에 대한 설명입니다.' }],
};

const SetDetailTheme = () => {
  const { competitionTheme, competitionType, setCompetitionTheme } = useCreateRoomStateStore();
  const themeList = themeOptions[competitionType] || [];

  const handlePress = (title) => {
    const selectedTheme = themeList.find((item) => item.title === title);

    if (title === '스쿼트 내기') {
      Alert.alert('아직 준비 중인 기능이에요! 곧 찾아뵐게요 💪');
    } else if (selectedTheme) {
      setCompetitionTheme(selectedTheme.competitionTheme);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {themeList.map((item, index) => (
        <DatailThemeCard
          key={index}
          title={item.title}
          description={item.description}
          onPress={handlePress}
          isSelected={competitionTheme === item.competitionTheme}
        />
      ))}
    </ScrollView>
  );
};

const DatailThemeCard = ({ title, description, onPress, isSelected }) => {
  return (
    <Pressable onPress={() => onPress(title)} style={[styles.cardContainer, isSelected && styles.selected]}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
    gap: 10,
  },
  titleText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    fontFamily: 'Pretendard',
  },
  descriptionText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    fontFamily: 'Pretendard',
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
});

export default SetDetailTheme;
