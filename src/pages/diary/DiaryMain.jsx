import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import DiaryCalendar from '../../components/DiaryCalendar';
import DiaryCalendarBottomSheet from '../../components/DiaryCalendarBottomSheet';
import DiaryTypePicker from '../../components/DiaryTypePicker';
import HeaderComponents from '../../components/HeaderComponents';
import { BACKGROUND_COLORS, BUTTON_COLORS, COLORS, TEXT_COLORS } from '../../constants/colors';
import { LAYOUT_PADDING } from '../../constants/space';
import useDiaryCalendarStore from '../../store/food/calendar/index';
import FoodDiary from './foodDiary/FoodDiary';
import WorkoutDiary from './workoutDiary/WorkoutDiary';

const DiaryMain = () => {
  const bottomSheetModalRef = useRef(null);
  const { weekOfMonth, activeType } = useDiaryCalendarStore();

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <View style={{ height: 60, backgroundColor: '#fff' }}>
        <HeaderComponents icon="date" title={weekOfMonth} onDatePress={openBottomSheet} />
      </View>
      <View style={styles.dateContainer}>
        <DiaryCalendar />
        <DiaryTypePicker />
      </View>
      {renderComponent(activeType)}
      <DiaryCalendarBottomSheet ref={bottomSheetModalRef} />
    </SafeAreaView>
  );
};

const renderComponent = (type) => {
  switch (type) {
    case '식단':
      return <FoodDiary />;

    default:
      return <WorkoutDiary />;
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLORS.greyDark,
  },

  dateContainer: {
    paddingVertical: 16,
    alignItems: 'center',
    ...LAYOUT_PADDING,
  },
});
export default DiaryMain;
