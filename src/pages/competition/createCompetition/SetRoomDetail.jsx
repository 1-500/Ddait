import React, { useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import CustomInput from '../../../components/CustomInput';
import OptionSelector from '../../../components/OptionSelector';
import Toggle from '../../../components/Toggle';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
const calendar = require('../../../assets/images/calendar.png');
const options = [2, 5, 10, 20];

const { width } = Dimensions.get('window');
const SetRoomDetail = () => {
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
    <ScrollView style={styles.scrollView}>
      {menuItems.map((item, index) => (
        <MenuItem key={index} title={item.title} component={item.component} isLast={index === menuItems.length - 1} />
      ))}
    </ScrollView>
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
      <CustomInput size="stretch" theme="primary" placeholder="시작 날짜" />
      <Text style={{ color: COLORS.white, fontWeight: FONT_WEIGHTS.semiBold }}>~</Text>
      <CustomInput size="stretch" theme="primary" placeholder="종료 날짜" />
      <Pressable>
        <Image source={calendar} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width,
    alignSelf: 'center',
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
    //기간은 세로로 나열
    flexDirection: 'colomn',
    alignItems: 'flex-start',
  },
  lastMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.medium,
    fontFamily: 'Pretendard',
    color: COLORS.white,
    flex: 1,
  },
  periodSelectorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
});

export default SetRoomDetail;
