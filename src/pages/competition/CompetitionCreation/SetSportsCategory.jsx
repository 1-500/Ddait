import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
import useCompetitionRoomStore from '../../../store/competition/index'; // Zustand 스토어를 가져옵니다

const sportsCategory = [
  { title: '웨이트트레이닝', imgSource: require('../../../assets/images/lifting-weights.png') },
  { title: '등산', imgSource: require('../../../assets/images/mountain.png') },
  { title: '러닝', imgSource: require('../../../assets/images/runner-man.png') },
  { title: '다이어트', imgSource: require('../../../assets/images/avocado.png') },
];

const SetSportsCategory = () => {
  const { competitionType, setCompetitionType } = useCompetitionRoomStore();

  const handlePress = (title) => {
    const unavailables = ['등산', '러닝', '다이어트'];
    if (unavailables.includes(title)) {
      Alert.alert('아직 준비 중인 기능이에요! 곧 찾아뵐게요 💪');
    } else {
      setCompetitionType(title);
    }
  };

  return (
    <View style={styles.boxWrapper}>
      {sportsCategory.map((item, index) => (
        <Box
          key={index}
          title={item.title}
          imgSource={item.imgSource}
          onPress={handlePress}
          isSelected={competitionType === item.title}
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
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    fontFamily: 'Pretendard',
  },
  icon: {
    width: 100,
    height: 100,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
});

export default SetSportsCategory;
