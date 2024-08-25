import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';

LocaleConfig.locales.fr = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: 'Aujourd hui',
};

LocaleConfig.defaultLocale = 'fr';

const WorkoutDatePick = () => {
  const today = new Date().toISOString().split('T')[0];

  const navigation = useNavigation();
  const [weekDays, setWeekDays] = useState(['21', '22', '23', '24', '25', '26', '27']);
  const [selected, setSelected] = useState(today);
  const [selectedDayInfo, setSelectedDayInfo] = useState('');

  const handleDayPress = (day) => {
    // 선택된 날짜의 운동 정보를 가져오기 위해 선택 날짜 정보 저장 => 이 정보를 기준으로 해당 날짜의 운동 정보를 가져오고 화면에 표시
    setSelected(day.dateString);
    setSelectedDayInfo(day);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUND_COLORS.greyDark }}>
      <HeaderComponents
        icon="date"
        title="오늘 날짜 데이터를 기준 주"
        onDatePress={() => {
          navigation.navigate('WorkoutDatePickScreen');
        }}
      />

      <View style={styles.dateContainer}>
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <TouchableOpacity key={index} style={day === '23' ? styles.activeDay : styles.day}>
              <Text style={day === '23' ? styles.activeDayText : styles.dayText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Calendar
        style={{
          borderWidth: 1,
          borderColor: '#1C1C1C',
          height: 350,
          color: '#E0E0E0',
        }}
        current={'2024-08-23'}
        monthFormat={'yyyy.MM'}
        // minDate={'2024-08-23'}
        // maxDate={'2024-08-26'}
        onDayPress={(day) => {
          handleDayPress(day);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: COLORS.primary,
            selectedTextColor: COLORS.white,
          },
          // [today]: { selected: true, selectedColor: COLORS.primary },
        }}
        theme={{
          backgroundColor: '#1C1C1C',
          calendarBackground: '#1C1C1C',
          textSectionTitleColor: '#5D5DFC',
          monthTextColor: '#E0E0E0',
          selectedDayBackgroundColor: '#5D5DFC',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#5D5DFC',
          dayTextColor: '#E0E0E0',
          textDisabledColor: '#3C3C3C',
          arrowColor: '#5D5DFC',
        }}
      />

      <View style={{ ...LAYOUT_PADDING }}>
        <CustomButton
          theme="primary"
          size="large"
          states="enabled"
          onPress={() => {
            navigation.navigate('WorkoutDiaryScreen');
          }}
          text="해당 날짜 운동 기록 보러가기"
        />
      </View>
    </SafeAreaView>
  );
};

export default WorkoutDatePick;

const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: BACKGROUND_COLORS.dark,
    paddingVertical: 16,
    alignItems: 'center',
    ...LAYOUT_PADDING,
  },
  monthText: {
    color: TEXT_COLORS.secondary,
    fontSize: 16,
    marginBottom: 8,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  day: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: BACKGROUND_COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDay: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    color: TEXT_COLORS.secondary,
    fontSize: 14,
  },
  activeDayText: {
    color: TEXT_COLORS.primary,
    fontSize: 14,
  },
  diaryContentContainer: {
    backgroundColor: BACKGROUND_COLORS.dark,
    flex: 1,
    ...LAYOUT_PADDING,
  },
});
