import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';

const themeList = [
  {
    title: '랭킹전',
    description: '누가 가장 열심히 하는 따잇러? \n1등을 차지해봅시다!',
    imgSource: require('../../../assets/images/1st-medal.png'),
  },
  {
    title: '1:1',
    description: '일대 일로 제대로 붙자! \n둘이서 하는 불타는 경쟁',
    imgSource: require('../../../assets/images/lifting-weights.png'),
  },
];

const SetTheme = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handlePress = (title) => {
    setSelectedCard(title);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {themeList.map((item) => (
        <ThemeCard
          key={item.title}
          title={item.title}
          description={item.description}
          imgSource={item.imgSource}
          onPress={handlePress}
          isSelected={selectedCard === item.title}
        />
      ))}
    </ScrollView>
  );
};

const ThemeCard = ({ title, imgSource, description, onPress, isSelected }) => {
  return (
    <Pressable onPress={() => onPress(title)} style={[styles.cardContainer, isSelected && styles.selected]}>
      <Image style={styles.cardImg} source={imgSource} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: 24,
    flexDirection: 'row',
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
    gap: 20,
  },
  cardImg: {
    width: 64,
    height: 64,
  },
  textContainer: {
    gap: 20,
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

export default SetTheme;
