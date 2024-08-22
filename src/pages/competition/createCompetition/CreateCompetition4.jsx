import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import StepIndicator from '../../../components/StepIndicator';
import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING } from '../../../constants/space';
import TemporaryHeader from '../TemporaryHeader';

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

const CreateCompetition4 = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handlePress = (title) => {
    setSelectedCard(title);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TemporaryHeader title={'경쟁 생성하기'} />
      <View style={[LAYOUT_PADDING, ELEMENT_VERTICAL_MARGIN]}>
        <StepIndicator currentStep={4} steps={5} />
        <Text style={styles.stepText}>4. 테마를 선택하세요.</Text>
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
      </View>
    </SafeAreaView>
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
  safeAreaView: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.dark,
  },
  stepText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: COLORS.white,
    marginVertical: 20,
  },
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
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Pretendard',
  },
  descriptionText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Pretendard',
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
});

export default CreateCompetition4;
