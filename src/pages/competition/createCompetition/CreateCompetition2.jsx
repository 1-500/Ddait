import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import StepIndicator from '../../../components/StepIndicator';
import TemporaryHeader from '../TemporaryHeader';

const sportsCategory = [
  { text: '웨이트트레이닝', imgSource: require('../../../assets/images/lifting-weights.png') },
  { text: '등산', imgSource: require('../../../assets/images/mountain.png') },
  { text: '산책', imgSource: require('../../../assets/images/runner-man.png') },
  { text: '다이어트', imgSource: require('../../../assets/images/avocado.png') },
];

const CreateCompetition2 = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TemporaryHeader title={'경쟁 생성하기'} />
      <View style={styles.container}>
        <StepIndicator currentStep={2} steps={5} />
        <Text style={styles.stepText}>2. 원하는 운동 카테고리를 선택하세요.</Text>
        <ScrollView>
          <View style={styles.boxWrapper}>
            {sportsCategory.map((item, index) => (
              <Box key={index} text={item.text} imgSource={item.imgSource} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const Box = ({ text, imgSource }) => {
  return (
    <View style={styles.boxContainer}>
      <Text style={styles.boxText}>{text}</Text>
      <Image style={styles.icon} source={imgSource} />
    </View>
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
});

export default CreateCompetition2;
