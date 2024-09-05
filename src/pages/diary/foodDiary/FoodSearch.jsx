import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getFoodBySearch } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
import { debounce } from '../../../utils/foodDiary/debounce';

const PlusButtonIcon = require('../../../assets/images/dietDiary/PluscircleButton.png');
const BookmarkIcon = require('../../../assets/images/dietDiary/bookmark.png');

const FoodSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [foodListState, setFoodListState] = useState([]);

  const handleSearchInput = debounce(async (text) => {
    try {
      let result = await getFoodBySearch(text);
      if (result.error) {
        throw new Error('서버에서 에러가 발생하여 조회를 실패하였습니다.');
      }
      if (result.data.length) {
        setFoodListState(result.data);
      }
      setSearchText(text);
    } catch (error) {
      Alert.alert(error.message);
    }
  }, 300);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <HeaderComponents title="음식 검색" />
      <View style={styles.container}>
        <View style={{ marginVertical: 5 }}>
          <CustomInput
            style={{ padding: 10 }}
            theme="search"
            size="large"
            placeholder="음식명 검색"
            onChangeText={handleSearchInput}
          />
        </View>
        <ScrollView style={styles.foodListContainer}>
          {foodListState?.map((food) => {
            return (
              <FoodInfoCard key={food.id} name={food.name} serving_size={food.serving_size} calories={food.calories} />
            );
          })}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CustomButton size="large" text="기록하기" theme="primary" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const FoodInfoCard = ({ name, calories, serving_size }) => {
  return (
    <View style={styles.foodItem}>
      <View>
        <Text style={{ color: 'white', marginBottom: 5, fontSize: FONT_SIZES.sm }}>{name}</Text>
        <Text style={{ color: COLORS.white }}>{serving_size}g</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'white', marginRight: 10, fontSize: FONT_SIZES.sm }}>{calories}kcal</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <TouchableOpacity activeOpacity={0.6}>
            <Image source={PlusButtonIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}>
            <Image source={BookmarkIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },

  foodListContainer: {
    marginVertical: 15,
    height: 150,
  },
  foodListTitle: {
    color: 'white',
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default FoodSearch;
