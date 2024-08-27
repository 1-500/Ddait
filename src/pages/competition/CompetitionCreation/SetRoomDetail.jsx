import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import CustomInput from '../../../components/CustomInput';
import DatePickerBottomSheet from '../../../components/DatePickerBottomSheet';
import OptionSelector from '../../../components/OptionSelector';
import Toggle from '../../../components/Toggle';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
import useCreateRoomStateStore from '../../../store/competition/index';

const calendar = require('../../../assets/images/calendar.png');
const maxMembersOptions = [2, 5, 10, 20];
const { width } = Dimensions.get('window');

const SetRoomDetail = () => {
  const {
    isPrivate,
    hasSmartWatch,
    maxMembers,
    startDate,
    endDate,
    setIsPrivate,
    setHasSmartWatch,
    setMaxMembers,
    setStartDate,
    setEndDate,
  } = useCreateRoomStateStore((state) => ({
    isPrivate: state.isPrivate,
    hasSmartWatch: state.hasSmartWatch,
    maxMembers: state.maxMembers,
    startDate: state.startDate,
    endDate: state.endDate,
    setIsPrivate: state.setIsPrivate,
    setHasSmartWatch: state.setHasSmartWatch,
    setMaxMembers: state.setMaxMembers,
    setStartDate: state.setStartDate,
    setEndDate: state.setEndDate,
  }));

  const snapPoints = useMemo(() => ['50%', '70%'], []);
  const startDateBottomSheetRef = useRef(null);
  const endDateBottomSheetRef = useRef(null);

  const openStartDatePicker = useCallback(() => {
    startDateBottomSheetRef.current?.present();
  }, []);

  const openEndDatePicker = useCallback(() => {
    endDateBottomSheetRef.current?.present();
  }, []);

  const handleStartDateChange = (text) => {
    const [year, month, day] = text.split('/').map(Number);
    if (year && month && day) {
      setStartDate({ year: year.toString(), month: month.toString(), day: day.toString() });
    }
  };

  const handleEndDateChange = (text) => {
    const [year, month, day] = text.split('/').map(Number);
    if (year && month && day) {
      setEndDate({ year: year.toString(), month: month.toString(), day: day.toString() });
    }
  };

  const menuItems = [
    {
      title: '공개 여부',
      component: <Toggle isOn={isPrivate} onToggle={() => setIsPrivate(!isPrivate)} />,
    },
    {
      title: '스마트 워치',
      component: <Toggle isOn={hasSmartWatch} onToggle={() => setHasSmartWatch(!hasSmartWatch)} />,
    },
    {
      title: '인원',
      component: (
        <OptionSelector options={maxMembersOptions} selectedOption={maxMembers} setSelectedOption={setMaxMembers} />
      ),
    },
    {
      title: '기간',
      component: (
        <PeroidSelector
          onPressStartInput={openStartDatePicker}
          onPressEndInput={openEndDatePicker}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
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
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

const MenuItem = ({ title, component, isLast }) => (
  <View style={[styles.menuContainer, isLast && styles.lastMenuItem, title === '기간' ? styles.flexColumn : null]}>
    <Text style={styles.menuText}>{title}</Text>
    {component}
  </View>
);

const PeroidSelector = ({
  onPressStartInput,
  onPressEndInput,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const formatDateString = (date) => {
    if (!date) {
      return '';
    }
    const { year, month, day } = date;
    return `${year}/${month}/${day}`;
  };

  return (
    <View style={styles.periodSelectorContainer}>
      <CustomInput
        size="stretch"
        theme="primary"
        placeholder="시작 날짜"
        value={formatDateString(startDate)}
        onPress={onPressStartInput}
        onChangeText={onStartDateChange}
      />
      <Text style={{ color: COLORS.white, fontWeight: FONT_WEIGHTS.semiBold }}>~</Text>
      <CustomInput
        size="stretch"
        theme="primary"
        placeholder="종료 날짜"
        value={formatDateString(endDate)}
        onPress={onPressEndInput}
        onChangeText={onEndDateChange}
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
