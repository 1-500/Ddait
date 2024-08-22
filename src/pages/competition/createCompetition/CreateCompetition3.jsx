import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import OptionSelector from '../../../components/OptionSelector';
import StepIndicator from '../../../components/StepIndicator';
import Toggle from '../../../components/Toggle';
import { BACKGROUND_COLORS, COLORS } from '../../../constants/colors';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING } from '../../../constants/space';
import TemporaryHeader from '../TemporaryHeader';

const calendar = require('../../../assets/images/calendar.png');
const options = [2, 5, 10, 20];

const CreateCompetition3 = () => {
  const [isPublicToggleOn, setIsPublicToggleOn] = useState(false);
  const [isWatchToggleOn, setIsWatchToggleOn] = useState(false);

  const menuItems = [
    {
      title: '공개 여부',
      component: <Toggle isOn={isPublicToggleOn} onToggle={() => setIsPublicToggleOn(!isPublicToggleOn)} />,
    },
    {
      title: '스마트 워치',
      component: <Toggle isOn={isWatchToggleOn} onToggle={() => setIsWatchToggleOn(!isWatchToggleOn)} />,
    },
    { title: '인원', component: <OptionSelector options={options} /> },
    {
      title: '기간',
      component: <PeroidSelector />,
    },
  ];

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TemporaryHeader title={'경쟁 생성하기'} />
      <View style={[LAYOUT_PADDING, ELEMENT_VERTICAL_MARGIN]}>
        <StepIndicator currentStep={3} steps={5} />
        <Text style={styles.stepText}>3. 세부 사항들을 설정해주세요.</Text>
      </View>
      <ScrollView>
        {menuItems.map((item, index) => (
          <MenuItem key={index} title={item.title} component={item.component} isLast={index === menuItems.length - 1} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ title, component, isLast }) => (
  <View style={[styles.menuContainer, isLast && styles.lastMenuItem, title === '기간' ? styles.flexColumn : null]}>
    <Text style={styles.menuText}>{title}</Text>
    {component}
  </View>
);

const PeroidSelector = () => {
  return (
    <View style={styles.periodSelectorContainer}>
      <TextInput style={styles.input} placeholder="시작 날짜" placeholderTextColor={COLORS.placeholder} />
      <Text style={styles.inputText}>~</Text>
      <TextInput style={styles.input} placeholder="종료 날짜" placeholderTextColor={COLORS.placeholder} />
      <Pressable>
        <Image source={calendar} />
      </Pressable>
    </View>
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
  menuContainer: {
    flexDirection: 'row',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  flexColumn: {
    flexDirection: 'colomn',
    alignItems: 'flex-start',
  },
  lastMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuText: {
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'Pretendard',
    color: COLORS.white,
    flex: 1,
  },
  //peroidSelector
  periodSelectorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 8,
    borderColor: '#5d5dfc',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  inputText: {
    fontSize: 18,
    fontFamily: 'Pretendard',
    color: COLORS.white,
  },
});

export default CreateCompetition3;
