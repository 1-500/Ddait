import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import StepIndicator from '../../../components/StepIndicator';
import { COLORS } from '../../../constants/colors';
import TemporaryHeader from '../TemporaryHeader';

const sportsCategory = [
  { title: '웨이트트레이닝', imgSource: require('../../../assets/images/lifting-weights.png') },
  { title: '등산', imgSource: require('../../../assets/images/mountain.png') },
  { title: '산책', imgSource: require('../../../assets/images/runner-man.png') },
  { title: '다이어트', imgSource: require('../../../assets/images/avocado.png') },
];

const CreateCompetition2 = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handlePress = (title) => {
    setSelectedCard(title);
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TemporaryHeader title={'경쟁 생성하기'} />
      <View style={styles.container}>
        <StepIndicator currentStep={2} steps={5} />
        <Text style={styles.stepText}>2. 원하는 운동 카테고리를 선택하세요.</Text>
        <ScrollView>
          <View style={styles.boxWrapper}>
            {sportsCategory.map((item, index) => (
              <Box
                key={index}
                title={item.title}
                imgSource={item.imgSource}
                onPress={handlePress}
                isSelected={selectedCard === item.title}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
  safeAreaView: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  container: {
    padding: 20,
  },
  stepText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#e0e0e0',
    marginVertical: 20,
  },
  boxWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  boxContainer: {
    width: '48.5%',
    borderRadius: 24,
    backgroundColor: '#2a2a2a',
    padding: 18,
    alignItems: 'center',
    gap: 14,
  },
  boxText: {
    alignSelf: 'stretch',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: '#e0e0e0',
    textAlign: 'left',
  },
  icon: {
    width: 100,
    height: 100,
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
});

export default CreateCompetition2;
