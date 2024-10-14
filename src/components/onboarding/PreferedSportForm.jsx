import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BACKGROUND_COLORS, COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import useUserFormStore from '../../store/sign/signup';

const sportsCategory = [
  { title: '웨이트트레이닝', imgSource: require('../../assets/images/lifting-weights.png') },
  { title: '등산', imgSource: require('../../assets/images/mountain.png') },
  { title: '러닝', imgSource: require('../../assets/images/runner-man.png') },
  { title: '다이어트', imgSource: require('../../assets/images/avocado.png') },
];

const PreferedSportForm = () => {
  const { preferredSport, setPreferredSport } = useUserFormStore();

  const handleCard = (title) => {
    setPreferredSport(title);
  };

  return (
    <View style={styles.boxWrapper}>
      {sportsCategory.map((item, index) => (
        <Box
          key={index}
          title={item.title}
          imgSource={item.imgSource}
          onPress={handleCard}
          isSelected={preferredSport === item.title}
        />
      ))}
    </View>
  );
};

const Box = ({ title, imgSource, onPress, isSelected }) => {
  return (
    <Pressable onPress={() => onPress(title)} style={[styles.boxContainer, isSelected && styles.selected]}>
      <Text style={styles.boxText}>{title}</Text>
      <Image style={styles.icon} source={imgSource} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  boxWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  boxContainer: {
    width: '48.5%',
    padding: 18,
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: 24,
    alignItems: 'center',
    gap: 14,
  },
  boxText: {
    alignSelf: 'stretch',
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  icon: {
    width: 100,
    height: 100,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
});

export default PreferedSportForm;
