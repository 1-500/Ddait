import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { createFoodDiary, setMacroRatio, setUserWeight } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
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
  const [userWeightState, setUserWeightState] = useState(70);
  const [totalCaloriesState, setTotalCaloriesState] = useState(2000);
  const [carbRatioState, setCarbRatioState] = useState(0);
  const [proteinRatioState, setProteinRatioState] = useState(0);
  const [fatRatioState, setFatRatioState] = useState(0);

  const { setTime } = useSelectedFoodTimeStore();

  const navigation = useNavigation();

  const handleModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  const handleMinusWeightButton = () => {
    let newUserweight;
    try {
      newUserweight = userWeightState - 0.1;
      setUserWeight({
        userWeight: parseFloat(newUserweight.toFixed(1)),
      });
    } catch (error) {
      Alert.alert('DB에 반영하지 못했습니다.');
    }
    setUserWeightState(parseFloat(newUserweight.toFixed(1)));
  };

  const handlePlusWeightButton = () => {
    let newUserweight;
    try {
      newUserweight = userWeightState + 0.1;
      setUserWeight({
        userWeight: parseFloat(newUserweight.toFixed(1)),
      });
    } catch (error) {
      Alert.alert('DB에 반영하지 못했습니다.');
    }
    setUserWeightState(parseFloat(newUserweight.toFixed(1)));
  };

  const handleModalConfirmButton = async () => {
    const totalRatio = carbRatioState + proteinRatioState + fatRatioState;
    if (totalRatio === 100) {
      try {
        const result = await setMacroRatio({
          userWeight: userWeightState,
          carbRatio: carbRatioState,
          proteinRatio: proteinRatioState,
          fatRatio: fatRatioState,
          total_calories: totalCaloriesState,
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
        const result = await createFoodDiary();
        if (result.error) {
          throw new Error(result.error);
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    postFoodDiary();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.diaryContentContainer}>
        <View style={styles.weightSection}>
          <Text style={styles.sectionTitle}>체중</Text>
          <View style={styles.weightInputContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleMinusWeightButton}>
              <Image source={MinusButtonIcon} style={styles.weightButton} />
            </TouchableOpacity>
            <CustomInput size="medium" theme="primary" value={`${userWeightState}kg`} style={styles.weightInput} />
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
              >{`0/${calculateCarbsCalories(carbRatioState, totalCaloriesState)}g`}</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>단</Text>
              <Text
                style={styles.macroValue}
              >{`0/${calculateProteinCalories(proteinRatioState, totalCaloriesState)}g`}</Text>
            </View>
            <View style={styles.macroItem}>
              <Text style={styles.macroLabel}>지</Text>
              <Text style={styles.macroValue}>{`0/${calculateFatCalories(fatRatioState, totalCaloriesState)}g`}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Progress.Bar progress={0.3} width={313} height={24} color="#6464FF" borderRadius={RADIUS.small} />
          </View>
          <View style={styles.calorieInfoContainer}>
            <Text style={styles.calorieInfoText}>72.8 / {totalCaloriesState} kcal</Text>
            <Text style={styles.calorieInfoText}>{totalCaloriesState}kcal 남음</Text>
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
                    defaultValue={`${carbRatioState.toString()}`}
                    value={carbRatioState}
                    onChangeText={(text) => setCarbRatioState(Number(text))}
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
                    defaultValue={`${proteinRatioState.toString()}`}
                    onChangeText={(text) => setProteinRatioState(Number(text))}
                  />
                  <Text style={{ color: COLORS.white, fontSize: FONT_SIZES.md }}>%</Text>
                </View>
              </View>
              <View style={{ display: 'flex', gap: 10 }}>
                <Text style={styles.modalText}>지방</Text>
                <View style={styles.modalButtonWrapper}>
                  <CustomInput
                    size="small"
                    defaultValue={`${fatRatioState.toString()}`}
                    theme="user"
                    onChangeText={(text) => setFatRatioState(Number(text))}
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
                defaultValue={totalCaloriesState}
                onChangeText={(text) => setTotalCaloriesState(text)}
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
