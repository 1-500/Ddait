import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import StepIndicator from '../../../components/StepIndicator';
import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING } from '../../../constants/space';
import TemporaryHeader from '../TemporaryHeader';

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

const CreateCompetition5 = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TemporaryHeader title={'경쟁 생성하기'} />
      <View style={[LAYOUT_PADDING, ELEMENT_VERTICAL_MARGIN]}>
        <StepIndicator currentStep={5} steps={5} />
        <Text style={styles.stepText}>5. 상세 테마를 선택하세요.</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {themeList.map((item) => (
            <DatailThemeCard title={item.title} description={item.description} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const DatailThemeCard = ({ title, imgSource, description }) => {
  return (
    <Pressable style={styles.cardContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
    gap: 10,
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
});

export default CreateCompetition5;
