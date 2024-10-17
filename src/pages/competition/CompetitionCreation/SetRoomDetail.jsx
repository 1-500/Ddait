import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import DatePickerBottomSheet from '../../../components/bottomSheet/DatePickerBottomSheet';
import OptionSelector from '../../../components/competitionCreation/OptionSelector';
import PeroidSelector from '../../../components/competitionCreation/PeroidSelector';
import Toggle from '../../../components/Toggle';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import useCreateRoomStateStore from '../../../store/competition/index';
import { useToastMessageStore } from '../../../store/toastMessage/toastMessage';

const { width } = Dimensions.get('window');

const maxMembersOptions = [2, 5, 10, 20];

const SetRoomDetail = () => {
  const { showToast } = useToastMessageStore();
  const {
    isPrivate,
    hasSmartWatch,
    maxMembers,
    startDate,
    endDate,
    theme,
    setIsPrivate,
    setHasSmartWatch,
    setMaxMembers,
    setStartDate,
    setEndDate,
  } = useCreateRoomStateStore();

  // 바텀 시트
  const snapPoints = useMemo(() => (Platform.OS === 'ios' ? ['70%', '60%'] : ['70%', '50%']), []);
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
      title: '비공개 설정',
      subTitle: isPrivate ? '방이 비공개로 설정됩니다.' : '경쟁방에 모두가 참여할 수 있습니다.',
      component: <Toggle isOn={isPrivate} onToggle={() => setIsPrivate(!isPrivate)} />,
    },
    {
      title: '스마트 워치',
      component: <Toggle isOn={hasSmartWatch} onToggle={() => setHasSmartWatch(!hasSmartWatch)} />,
    },
    {
      title: '인원',
      component: (
        <OptionSelector
          options={maxMembersOptions}
          selectedOption={maxMembers}
          setSelectedOption={setMaxMembers}
          disabledOptions={theme === '1:1' ? [5, 10, 20] : [2]}
        />
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
        />
      ),
    },
  ];

  return (
    <ScrollView style={styles.scrollView}>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          subTitle={item.subTitle}
          component={item.component}
          isLast={index === menuItems.length - 1}
        />
      ))}
      <DatePickerBottomSheet
        ref={startDateBottomSheetRef}
        selectedDate={startDate}
        setSelectedDate={setStartDate}
        onDateChange={(date) => {
          const minimumStartDate = dayjs().add(1, 'day').toDate();
          const minimumEndDate = dayjs(date).add(7, 'day').toDate();
          if (date && minimumStartDate > date) {
            showToast('경쟁은 최소 하루 뒤부터 시작할 수 있습니다.', 'error');
            setStartDate(minimumStartDate);
          }
          if (endDate && minimumEndDate > endDate) {
            setEndDate(minimumEndDate);
          }
        }}
        minimumDate={dayjs().add(1, 'day').toDate()}
        title="시작 날짜를 선택하세요"
        snapPoints={snapPoints}
      />
      <DatePickerBottomSheet
        ref={endDateBottomSheetRef}
        selectedDate={endDate}
        setSelectedDate={setEndDate}
        onDateChange={(date) => {
          const minimumEndDate = dayjs(startDate).add(7, 'day').toDate();
          if (date && minimumEndDate > date) {
            showToast('경쟁 기간은 최소 일주일이어야 합니다.', 'error');
            setEndDate(minimumEndDate);
          }
        }}
        minimumDate={dayjs().add(1, 'day').toDate()}
        title="종료 날짜를 선택하세요"
        snapPoints={snapPoints}
      />
    </ScrollView>
  );
};

const MenuItem = ({ title, subTitle, component, isLast }) => (
  <View style={[styles.menuContainer, isLast && styles.lastMenuItem, title === '기간' ? styles.flexColumn : null]}>
    <View style={{ flex: 1, gap: 4 }}>
      <Text style={styles.menuText}>{title}</Text>
      {subTitle && <Text style={[styles.menuText, styles.subText]}>{subTitle}</Text>}
    </View>
    {component}
  </View>
);

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
    alignItems: 'stretch',
  },
  lastMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuText: {
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
  },
  subText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    color: COLORS.lightGrey,
  },
  periodSelectorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
  dateSeparator: {
    color: COLORS.white,
    fontFamily: FONTS.PRETENDARD[600],
  },
});

export default SetRoomDetail;
