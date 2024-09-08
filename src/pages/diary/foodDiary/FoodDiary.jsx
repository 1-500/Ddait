import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { createFoodDiary, getUserFoodDiary, setMacroRatio, setUserWeight } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import useDiaryCalendarStore from '../../../store/food/calendar/index';
import useSelectedFoodTimeStore from '../../../store/index';
import { calculateCarbsCalories, calculateFatCalories, calculateProteinCalories } from '../../../utils/foodDiary/index';

const PlusButtonIcon = require('../../../assets/images/dietDiary/PluscircleButton.png');
const MinusButtonIcon = require('../../../assets/images/dietDiary/MinusCircleButton.png');

const items = [
  { name: '아침', title: '400kcal', icon: require('../../../assets/images/sun-horizon.png') },
  { name: '점심', title: '800kcal', icon: require('../../../assets/images/sun.png') },
  { name: '저녁', title: '500kcal', icon: require('../../../assets/images/moon.png') },
  { name: '간식', title: '', icon: require('../../../assets/images/candy.png') },
  { name: '물', title: '', icon: require('../../../assets/images/water.png') },
];

const FoodDiary = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [userState, setUserState] = useState({
    weight: 70,
    totalCalories: 2000,
    macroRatio: {
      carbs: 0,
      protein: 0,
      fat: 0,
    },
  });
  const { setTime } = useSelectedFoodTimeStore();

  const { selected } = useDiaryCalendarStore();

  const navigation = useNavigation();

  const handleModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  const handleWeightInput = async (text) => {
    let newUserweight = parseFloat(text);
    if (isNaN(newUserweight)) {
      return;
    }
    try {
      const result = await setUserWeight({
        userWeight: parseFloat(newUserweight.toFixed(1)),
        date: selected,
      });
      if (result.status !== 200) {
        throw new Error('데이터를 반영하지 못했습니다');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
    setUserState((prevState) => ({
      ...prevState,
      weight: parseFloat(newUserweight.toFixed(1)), // 예시로 체중 업데이트
    }));
  };

  const handleMinusWeightButton = async () => {
    let newUserweight;
    try {
      newUserweight = userState.weight - 0.1;
      const result = await setUserWeight({
        userWeight: parseFloat(newUserweight.toFixed(1)),
        date: selected,
      });
      if (result.status !== 200) {
        throw new Error('데이터를 반영하지 못했습니다');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
    setUserState((prevState) => ({
      ...prevState,
      weight: parseFloat(newUserweight.toFixed(1)), // 예시로 체중 업데이트
    }));
  };

  const handlePlusWeightButton = async () => {
    let newUserweight;
    try {
      newUserweight = userState.weight + 0.1;
      const result = await setUserWeight({
        userWeight: parseFloat(newUserweight.toFixed(1)),
        date: selected,
      });
      if (result.status !== 200) {
        throw new Error('데이터를 반영하지 못했습니다');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
    setUserState((prevState) => ({
      ...prevState,
      weight: parseFloat(newUserweight.toFixed(1)), // 예시로 체중 업데이트
    }));
  };

  const handleModalConfirmButton = async () => {
    const totalRatio = userState.macroRatio.carbs + userState.macroRatio.protein + userState.macroRatio.fat;
    if (totalRatio === 100) {
      try {
        const result = await setMacroRatio({
          userWeight: userState.weight,
          carbRatio: userState.macroRatio.carbs,
          proteinRatio: userState.macroRatio.protein,
          fatRatio: userState.macroRatio.fat,
          total_calories: userState.totalCalories,
          date: selected,
        });
        if (result.status !== 200) {
          throw new Error();
        }
      } catch (error) {
        Alert.alert('DB에 반영하지 못했습니다.');
      }
      setIsVisibleModal(false);
      return;
    }
    Alert.alert('탄단지 비율을 100으로 두어야 합니다!');
  };

  const handleMealTime = (time) => {
    setTime(time);
    navigation.navigate('FoodDiary', {
      screen: 'FoodDetailScreen',
    });
  };

  useEffect(() => {
    const postFoodDiary = async () => {
      try {
        const result = await createFoodDiary(selected);
        if (result.error) {
          throw new Error(result.error);
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    postFoodDiary();
  }, [selected]);

  useEffect(() => {
    const fetchUserFoodDiary = async () => {
      try {
        const result = await getUserFoodDiary(selected);
        if (result.error) {
          throw new Error(result.error);
        }
        if (result.status === 200) {
          const userInfo = result.data;
          setUserState({
            weight: Number(userInfo.userWeight),
            totalCalories: Number(userInfo.totalCalories),
            macroRatio: {
              carbs: Number(userInfo.carbRatio),
              protein: Number(userInfo.proteinRatio),
              fat: Number(userInfo.fatRatio),
            },
          });
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    fetchUserFoodDiary();
  }, [selected]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.diaryContentContainer}>
        <View style={styles.weightSection}>
          <Text style={styles.sectionTitle}>체중</Text>
          <View style={styles.weightInputContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleMinusWeightButton}>
              <Image source={MinusButtonIcon} style={styles.weightButton} />
            </TouchableOpacity>

            <CustomInput
              size="medium"
              theme="primary"
              defaultValue={`${userState.weight}`}
              onChangeText={handleWeightInput}
              style={styles.weightInput}
            />
            <Text style={{ color: 'white', fontSize: FONT_SIZES.lg }}>kg</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={handlePlusWeightButton}>
              <Image source={PlusButtonIcon} style={styles.weightButton} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.calorieSection}>
          <Text style={styles.sectionTitle}>칼로리</Text>
          <View style={styles.macroContainer}>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>탄</Text>
              <Text
                style={styles.macroValue}
              >{`0/${calculateCarbsCalories(userState.macroRatio.carbs, userState.totalCalories)}g`}</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>단</Text>
              <Text
                style={styles.macroValue}
              >{`0/${calculateProteinCalories(userState.macroRatio.protein, userState.totalCalories)}g`}</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>지</Text>
              <Text
                style={styles.macroValue}
              >{`0/${calculateFatCalories(userState.macroRatio.fat, userState.totalCalories)}g`}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Progress.Bar progress={0.3} width={313} height={24} color="#6464FF" borderRadius={RADIUS.small} />
          </View>
          <View style={styles.calorieInfoContainer}>
            <Text style={styles.calorieInfoText}>72.8 / {userState.totalCalories} kcal</Text>
            <Text style={styles.calorieInfoText}>{userState.totalCalories}kcal 남음</Text>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton theme="primary" size="large" text="목표 칼로리 설정" onPress={handleModal} />
          </View>
        </View>
        <View style={styles.mealItemsContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.mealItemWrapper}>
              <Text style={styles.mealItemName}>{item.name}</Text>
              <TouchableOpacity style={styles.mealItemButton} onPress={() => handleMealTime(item.name)}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.mealItemTitle}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal visible={isVisibleModal} animationType="slide" transparent={true} onRequestClose={handleModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalButtonContainer}>
              <View style={{ display: 'flex', gap: 10 }}>
                <Text style={styles.modalText}>탄수화물</Text>
                <View style={styles.modalButtonWrapper}>
                  <CustomInput
                    size="small"
                    theme="user"
                    defaultValue={`${userState.macroRatio.carbs.toString()}`}
                    onChangeText={(text) =>
                      setUserState((prevState) => ({
                        ...prevState,
                        macroRatio: {
                          ...prevState.macroRatio,
                          carbs: Number(text),
                        },
                      }))
                    }
                  />
                  <Text style={styles.modalText}>%</Text>
                </View>
              </View>
              <View style={{ display: 'flex', gap: 10 }}>
                <Text style={styles.modalText}>단백질</Text>
                <View style={styles.modalButtonWrapper}>
                  <CustomInput
                    size="small"
                    theme="user"
                    defaultValue={`${userState.macroRatio.protein.toString()}`}
                    onChangeText={(text) =>
                      setUserState((prevState) => ({
                        ...prevState,
                        macroRatio: {
                          ...prevState.macroRatio,
                          protein: Number(text),
                        },
                      }))
                    }
                  />
                  <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>%</Text>
                </View>
              </View>
              <View style={{ display: 'flex', gap: 10 }}>
                <Text style={styles.modalText}>지방</Text>
                <View style={styles.modalButtonWrapper}>
                  <CustomInput
                    size="small"
                    defaultValue={`${userState.macroRatio.fat.toString()}`}
                    theme="user"
                    onChangeText={(text) =>
                      setUserState((prevState) => ({
                        ...prevState,
                        macroRatio: {
                          ...prevState.macroRatio,
                          fat: Number(text),
                        },
                      }))
                    }
                  />
                  <Text style={styles.modalText}>%</Text>
                </View>
              </View>
            </View>
            <View style={styles.modalCalroriesContainer}>
              <Text style={{ fontFamily: FONTS.PRETENDARD[400], fontSize: FONT_SIZES.md, color: COLORS.white }}>
                총
              </Text>
              <CustomInput
                size="medium"
                theme="primary"
                defaultValue={userState.totalCalories.toString()}
                onChangeText={(text) =>
                  setUserState((prevState) => ({
                    ...prevState,
                    totalCalories: Number(text),
                  }))
                }
                style={{ fontFamily: FONTS.PRETENDARD[400], fontSize: FONT_SIZES.md, color: COLORS.white }}
              />

              <Text style={{ fontFamily: FONTS.PRETENDARD[400], fontSize: FONT_SIZES.md, color: COLORS.white }}>
                kcal
              </Text>
            </View>
            <CustomButton theme="primary" size="large" text="설정 완료" onPress={handleModalConfirmButton} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
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
    fontFamily: FONTS.PRETENDARD[400],
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
  mealItemTitle: {
    color: 'white',
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.PRETENDARD[600],
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[600],
  },
  modalContainer: {
    width: '100%',
    backgroundColor: COLORS.darkBackground,
    borderRadius: RADIUS.large,
    padding: 24,
    alignItems: 'center',
  },
  modalButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    gap: 20,
  },
  modalButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCalroriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'flex-end',
    marginVertical: 20,
  },
});

export default FoodDiary;
