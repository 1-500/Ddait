import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import CustomInput from '../../../components/CustomInput';
import DatePickerBottomSheet from '../../../components/DatePickerBottomSheet';
import OptionSelector from '../../../components/OptionSelector';
import Toggle from '../../../components/Toggle';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
const calendar = require('../../../assets/images/calendar.png');
const options = [2, 5, 10, 20];

const { width } = Dimensions.get('window');

const SetRoomDetail = () => {
  // 토글 상태 관리
  const [isPublicToggleOn, setIsPublicToggleOn] = useState(false);
  const [isWatchToggleOn, setIsWatchToggleOn] = useState(false);

  // 날짜 선택 상태 관리
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 페이지 로드 시 초기 날짜 설정
  useEffect(() => {
    const formattedDate = {
      year: '2023',
      month: '8',
      day: '30',
    };
    // 초기 날짜 설정 (필요시 주석 해제)
    // setStartDate(formattedDate);
    // setEndDate(formattedDate);
  }, []);

  // 바텀시트 참조 및 설정
  const snapPoints = useMemo(() => ['50%', '70%'], []);
  const startDateBottomSheetRef = useRef(null);
  const endDateBottomSheetRef = useRef(null);

  const openStartDatePicker = useCallback(() => {
    startDateBottomSheetRef.current?.present();
  }, []);

  const openEndDatePicker = useCallback(() => {
    endDateBottomSheetRef.current?.present();
  }, []);

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
      component: (
        <PeroidSelector
          onPressStartInput={openStartDatePicker}
          onPressEndInput={openEndDatePicker}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      ),
    },
  ];

  return (
    <BottomSheetModalProvider>
      <ScrollView style={styles.scrollView}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} title={item.title} component={item.component} isLast={index === menuItems.length - 1} />
        ))}
      </ScrollView>
      <DatePickerBottomSheet
        ref={startDateBottomSheetRef}
        selectedDate={startDate}
        setSelectedDate={setStartDate}
        title="시작 날짜를 선택하세요"
        snapPoints={snapPoints}
      />
      <DatePickerBottomSheet
        ref={endDateBottomSheetRef}
        selectedDate={endDate}
        setSelectedDate={setEndDate}
        title="종료 날짜를 선택하세요"
        snapPoints={snapPoints}
      />
    </BottomSheetModalProvider>
  );
};

const MenuItem = ({ title, component, isLast }) => (
  <View style={[styles.menuContainer, isLast && styles.lastMenuItem, title === '기간' ? styles.flexColumn : null]}>
    <Text style={styles.menuText}>{title}</Text>
    {component}
  </View>
);

const PeroidSelector = ({ onPressStartInput, onPressEndInput, startDate, endDate, setStartDate, setEndDate }) => {
  const formatDateString = (date) => {
    if (!date) {
      return '';
    }
    const { year, month, day } = date;
    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.periodSelectorContainer}>
      <CustomInput
        size="stretch"
        theme="primary"
        placeholder="시작 날짜"
        value={formatDateString(startDate)}
        onChangeText={(text) => setStartDate({ ...startDate, day: text })}
        onPress={onPressStartInput}
      />
      <Text style={{ color: COLORS.white, fontWeight: FONT_WEIGHTS.semiBold }}>~</Text>
      <CustomInput
        size="stretch"
        theme="primary"
        placeholder="종료 날짜"
        value={formatDateString(endDate)}
        onChangeText={(text) => setEndDate({ ...endDate, day: text })}
        onPress={onPressEndInput}
      />
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
    flexDirection: 'column',
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
