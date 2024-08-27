import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';

import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING } from '../../../constants/space';

const PlusButtonIcon = require('../../../assets/images/dietDiary/PluscircleButton.png');
const MinusButtonIcon = require('../../../assets/images/dietDiary/MinusCircleButton.png');

const items = [
  { name: '아침', title: '400kcal', icon: require('../../../assets/images/sun-horizon.png') },
  { name: '점심', title: '800kcal', icon: require('../../../assets/images/sun.png') },
  { name: '저녁', title: '500kcal', icon: require('../../../assets/images/moon.png') },
  { name: '간식', title: '', icon: require('../../../assets/images/candy.png') },
  { name: '물', title: '', icon: require('../../../assets/images/water.png') },
];

const DietDiary = () => {
  const [weekDays, setWeekDays] = useState(['21', '22', '23', '24', '25', '26', '27']);
  const [workoutTypes, setWorkoutTypes] = useState(['웨이트', '러닝', '식단', '등산']);
  const [activeWorkoutType, setActiveWorkoutType] = useState('식단');

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const navigation = useNavigation();
  const handleWorkoutTypePress = (type) => {
    if (type === '식단') {
      navigation.navigate('DietDiary', { screen: 'DietDiaryScreen' });
    } else if (type === '웨이트') {
      navigation.navigate('WorkoutDiary', { screen: 'WorkoutDiaryScreen' });
    }
    setActiveWorkoutType(type);
  };

  const handleModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents title="식단 일지" icon="date" />

      <View style={styles.dateContainer}>
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <TouchableOpacity key={index} style={day === '23' ? styles.activeDay : styles.day}>
              <Text style={day === '23' ? styles.activeDayText : styles.dayText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.workoutTypesContainer}>
          {workoutTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={type === activeWorkoutType ? styles.activeWorkoutType : styles.workoutType}
              onPress={() => handleWorkoutTypePress(type)}
            >
              <Text style={type === activeWorkoutType ? styles.activeWorkoutTypeText : styles.workoutTypeText}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView style={styles.diaryContentContainer}>
        <View style={styles.weightSection}>
          <Text style={styles.sectionTitle}>체중</Text>
          <View style={styles.weightInputContainer}>
            <TouchableOpacity activeOpacity={0.6}>
              <Image source={MinusButtonIcon} style={styles.weightButton} />
            </TouchableOpacity>
            <CustomInput size="medium" theme="primary" value="72.8kg" style={styles.weightInput} />
            <TouchableOpacity activeOpacity={0.6}>
              <Image source={PlusButtonIcon} style={styles.weightButton} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.calorieSection}>
          <Text style={styles.sectionTitle}>칼로리</Text>
          <View style={styles.macroContainer}>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>탄</Text>
              <Text style={styles.macroValue}>50/300g</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>단</Text>
              <Text style={styles.macroValue}>50/300g</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>지</Text>
              <Text style={styles.macroValue}>50/300g</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Progress.Bar progress={0.3} width={313} height={24} color="#6464FF" borderRadius={RADIUS.small} />
          </View>
          <View style={styles.calorieInfoContainer}>
            <Text style={styles.calorieInfoText}>72.8 / 2300kcal</Text>
            <Text style={styles.calorieInfoText}>2227.2kcal 남음</Text>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton theme="primary" size="large" text="목표 칼로리 설정" onPress={handleModal} />
          </View>
        </View>
        <View style={styles.mealItemsContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.mealItemWrapper}>
              <Text style={styles.mealItemName}>{item.name}</Text>
              <TouchableOpacity style={styles.mealItemButton}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.mealItemTitle}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal visible={isVisibleModal} animationType="slide" transparent={true} onRequestClose={handleModal}>
        <TouchableWithoutFeedback onPress={handleModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 10,
                  gap: 20,
                }}
              >
                <View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>탄수화물</Text>
                  <CustomInput size="small" theme="primary" value="" />
                </View>
                <View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>단백질</Text>
                  <CustomInput size="small" theme="primary" value="" />
                </View>
                <View style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>지방</Text>
                  <CustomInput size="small" theme="primary" value="" />
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  alignSelf: 'flex-end',
                  marginVertical: 20,
                }}
              >
                <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>총</Text>
                <CustomInput size="small" theme="primary" value="" />

                <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>kcal</Text>
              </View>
              <CustomButton theme="primary" size="large" text="설정 완료" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  dateContainer: {
    paddingVertical: 16,
    alignItems: 'center',
    ...LAYOUT_PADDING,
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
  workoutTypesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  workoutType: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: RADIUS.large,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLORS.greyDark,
  },
  activeWorkoutType: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutTypeText: {
    color: TEXT_COLORS.secondary,
    fontSize: 14,
  },
  activeWorkoutTypeText: {
    color: TEXT_COLORS.primary,
    fontSize: 14,
  },
  diaryContentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: BACKGROUND_COLORS.greyDark,
    borderRadius: RADIUS.large,
  },
  weightSection: {
    alignItems: 'center',
    backgroundColor: COLORS.darkBackground,
    height: 139,
    marginBottom: 10,
    padding: 20,
    gap: 15,
    borderRadius: RADIUS.large,
  },
  sectionTitle: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.lg,
  },
  weightInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weightButton: {
    width: 30,
    height: 30,
  },
  weightInput: {
    fontSize: FONT_SIZES.xl,
    textAlign: 'center',
  },
  calorieSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.darkBackground,
    height: 229,
    borderRadius: RADIUS.large,
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  macroItem: {
    flexDirection: 'row',
    gap: 3,
  },
  macroLabel: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.sm,
  },
  macroValue: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.xs,
  },
  calorieInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    gap: 10,
  },
  calorieInfoText: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.xs,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
  mealItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginVertical: 30,
  },
  mealItemWrapper: {
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  mealItemName: {
    fontSize: FONT_SIZES.sm,
    color: TEXT_COLORS.primary,
  },
  mealItemButton: {
    width: 100,
    height: 100,
    borderColor: '#BFBFFF',
    borderWidth: 1,
    backgroundColor: '#242424',
    borderRadius: RADIUS.large,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  icon: {
    // 아이콘 스타일 추가 필요
  },
  mealItemTitle: {
    color: 'white',
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: COLORS.darkBackground,
    borderRadius: RADIUS.large,
    padding: 20,
    alignItems: 'center',
  },
});

export default DietDiary;
