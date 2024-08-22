import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';

const themeList = [
  {
    title: '3대 측정 내기',
    description: '종목3개로대결합니다.',
  },
  {
    title: '달리기',
    description: '설명입니다.',
  },
];

const SetDetailTheme = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handlePress = (title) => {
    setSelectedCard(title);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {themeList.map((item) => (
        <DatailThemeCard
          title={item.title}
          description={item.description}
          onPress={handlePress}
          isSelected={selectedCard === item.title}
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
    fontWeight: FONT_WEIGHTS.regularu,
    fontFamily: 'Pretendard',
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
});

export default SetDetailTheme;
