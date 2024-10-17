import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { createCustomFood } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES } from '../../../constants/font';
import { useToastMessageStore } from '../../../store/toastMessage/toastMessage';

const CustomFoodRecord = () => {
  const [customModalFoodNameState, setCustomModalFoodNameState] = useState('');
  const [customModalCarbState, setCustomModalCarbState] = useState('');
  const [customModalProteinState, setCustomModalProteinState] = useState('');
  const [customModalFatState, setCustomModalFatState] = useState('');
  const [customModalCaloriesState, setCustomModalCaloriesState] = useState('');
  const [customModalServingSizeState, setCustomModalServingSizeState] = useState('');

  const navigation = useNavigation();
  const { showToast } = useToastMessageStore();

  const handleRecordButton = async () => {
    try {
      const food = {
        name: customModalFoodNameState,
        carbs: customModalCarbState,
        protein: customModalProteinState,
        fat: customModalFatState,
        calories: customModalCaloriesState,
        serving_size: customModalServingSizeState,
      };
      const result = await createCustomFood({
        food,
      });
      if (result.status !== 200) {
        throw new Error('직접 만든 음식을 생성하지 못했습니다.');
      }
      showToast('음식을 생성하였습니다!', 'success', 2000, 'top');
      navigation.goBack();
    } catch (error) {
      showToast(error.message, 'error', 2000, 'top');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderComponents title="음식 생성" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <CustomInput
              size="large"
              theme="user"
              placeholder="음식명을 입력하세요"
              onChangeText={(text) => setCustomModalFoodNameState(text)}
            />
          </View>
          <View style={styles.nutritionContainer}>
            <NutritionInput label="탄수화물" onChangeText={(text) => setCustomModalCarbState(text)} />
            <NutritionInput label="단백질" onChangeText={(text) => setCustomModalProteinState(text)} />
            <NutritionInput label="지방" onChangeText={(text) => setCustomModalFatState(text)} />
            <NutritionInput label="열량" onChangeText={(text) => setCustomModalCaloriesState(text)} unit="kcal" />
            <NutritionInput label="내용량" onChangeText={(text) => setCustomModalServingSizeState(text)} />
          </View>
          <View style={{ marginVertical: 20 }}>
            <CustomButton theme="primary" size="large" text="등록하기" onPress={handleRecordButton} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const NutritionInput = ({ label, onChangeText, unit = 'g' }) => (
  <View style={styles.nutritionInputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputRow}>
      <CustomInput size="medium" theme="primary" onChangeText={onChangeText} />
      <CustomInput size="medium" theme="primary" editable={false} value={unit} />
    </View>
  </View>
);

export default CustomFoodRecord;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // Assuming you have a background color defined
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 30,
  },
  nutritionContainer: {
    gap: 10,
  },
  nutritionInputContainer: {
    gap: 10,
  },
  label: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
