import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomButton from '../../../components/CustomButton';
import HeaderComponents from '../../../components/HeaderComponents';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';

const PlusButtonIcon = require('../../../assets/images/dietDiary/PluscircleButton.png');
const MinusButtonIcon = require('../../../assets/images/dietDiary/MinusCircleButton.png');

const DietDetail = ({ route }) => {
  const { time } = route.params;
  const carbPercentage = 30;
  const proteinPercentage = 50;
  const etcPercentage = 20;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents title={time} />

      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.6}>
            <Image source={PlusButtonIcon} style={styles.addButton} />
          </TouchableOpacity>
          <Text style={styles.addPhoto}>사진을 업로드하세요.</Text>
        </View>

        <ScrollView style={{ padding: 20 }}>
          <View style={styles.calorieContainer}>
            <Text style={styles.calorieText}>총 열량</Text>
            <Text style={styles.calorieText}>468kcal</Text>
          </View>

          <View style={styles.macroInfo}>
            <Text style={styles.macroText}>탄 35.2g</Text>
            <Text style={styles.macroText}>단 35.2g</Text>
            <Text style={styles.macroText}>지방 40.g</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressSegment, { width: `${carbPercentage}%`, backgroundColor: COLORS.primary }]}>
              <Text style={styles.progressText}>{carbPercentage}%</Text>
            </View>
            <View
              style={[styles.progressSegment, { width: `${proteinPercentage}%`, backgroundColor: COLORS.secondary }]}
            >
              <Text style={styles.progressText}>{proteinPercentage}%</Text>
            </View>
            <View style={[styles.progressSegment, { width: `${etcPercentage}%` }]}>
              <Text style={styles.progressText}>{etcPercentage}%</Text>
            </View>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.foodListTitle}>{time}</Text>
            <View style={styles.foodItem}>
              <View>
                <Text style={{ color: 'white', marginBottom: 5 }}>햇반</Text>
                <Text style={{ color: COLORS.white }}>100g</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.foodCalories}>132kcal</Text>
                <TouchableOpacity activeOpacity={0.6}>
                  <Image source={MinusButtonIcon} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.foodItem}>
            <View>
              <Text style={{ color: 'white', marginBottom: 5 }}>햇반</Text>
              <Text style={{ color: COLORS.white }}>100g</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.foodCalories}>132kcal</Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Image source={MinusButtonIcon} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.foodItem}>
            <View>
              <Text style={{ color: 'white', marginBottom: 5 }}>햇반</Text>
              <Text style={{ color: COLORS.white }}>100g</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.foodCalories}>132kcal</Text>
              <TouchableOpacity activeOpacity={0.6}>
                <Image source={MinusButtonIcon} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton
            size="medium"
            text="추가"
            theme="primary"
            onPress={() => navigation.navigate('DietDiary', { screen: 'FoodRecordScreen' })}
          />
          <CustomButton size="medium" text="확인" theme="secondary" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DietDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    height: 150,
    gap: 15,
  },
  addButton: {
    width: 40,
    height: 40,
  },
  addPhoto: {
    color: 'white',
    textAlign: 'center',
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  calorieContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calorieText: {
    color: 'white',
    fontWeight: FONT_WEIGHTS.semiBold,
    fontSize: FONT_SIZES.lg,
  },

  progressBar: {
    height: 20,
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: '#3A3A3A',
    borderRadius: RADIUS.small,
    overflow: 'hidden',
  },
  progressSegment: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontSize: FONT_SIZES.xxs,
    fontWeight: FONT_WEIGHTS.semiBold,
  },

  macroInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  macroText: {
    color: 'white',
  },

  foodListTitle: {
    color: 'white',
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    marginVertical: 10,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3A3A3A',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
  },
  foodName: {
    color: 'white',
  },
  foodCalories: {
    color: 'white',
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#5D5FEF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
  },
});
