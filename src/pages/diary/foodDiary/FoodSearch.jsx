import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { createBookMarkFoods, getFoodBySearch } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import useDiaryCalendarStore from '../../../store/food/calendar/index';
import useSelectedFoodsStore from '../../../store/food/selectedFoods/index';
import useSelectedFoodTimeStore from '../../../store/index';
import { useToastMessageStore } from '../../../store/toastMessage/toastMessage';
import { debounce } from '../../../utils/foodDiary/debounce';

const PlusIcon = require('../../../assets/images/dietDiary/PluscircleWhiteButton.png');
const BookmarkOffIcon = require('../../../assets/images/dietDiary/bookmarkWhite.png');
const checkIcon = require('../../../assets/images/dietDiary/checkIcon.png');
const BookmarkOnIcon = require('../../../assets/images/dietDiary/bookmark.png');

const FoodSearch = () => {
  const { showToast } = useToastMessageStore();
  const [searchText, setSearchText] = useState('');
  const [foodSearchListState, setFoodSearchListState] = useState([]);
  const { time } = useSelectedFoodTimeStore();
  const { selected } = useDiaryCalendarStore();
  const navigation = useNavigation();

  const { foodList, removeFood } = useSelectedFoodsStore();

  const handleSearchInput = debounce(async (text) => {
    try {
      let result = await getFoodBySearch(text);
      if (result.error) {
        throw new Error('서버에서 에러가 발생하여 조회를 실패하였습니다.');
      }
      if (result.data.length) {
        setFoodSearchListState(result.data);
      }
      setSearchText(text);
    } catch (error) {
      showToast(error.message, 'error');
    }
  }, 300);
  const handleCheckedFoods = (food) => {
    const isChecked = Array.isArray(foodList) && foodList.some((item) => item.id === food.id);
    if (isChecked) {
      removeFood(food.id);
    } else {
      navigation.navigate('FoodInfoScreen', {
        id: food.id,
        name: food.name,
        serving_size: food.serving_size,
        calories: food.calories,
        carbs: food.carbs,
        protein: food.protein,
        fat: food.fat,
      });
    }
  };
  const handleBookmarkFoods = async (food) => {
    const newFoodSearchListState = foodSearchListState.map((element) => {
      return element.id === food.id ? { ...element, isBookMarked: !element.isBookMarked } : { ...element };
    });
    try {
      if (newFoodSearchListState?.length) {
        let result = await createBookMarkFoods({
          bookMarkedFoods: newFoodSearchListState,
        });
        if (result.error) {
          throw new Error('서버 오류로 인해 북마크한 데이터가 반영되지 않았습니다');
        }
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
    setFoodSearchListState(newFoodSearchListState);
  };
  const handleRecordButton = async () => {
    navigation.navigate('FoodDiary', {
      screen: 'FoodDetailScreen',
    });
  };

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
          {foodSearchListState?.map((food) => {
            const isChecked = Array.isArray(foodList) && foodList.some((item) => item.id === food.id);
            return (
              <FoodInfoCard
                key={food.id}
                name={food.name}
                serving_size={food.serving_size}
                calories={food.calories}
                isCheckFood={isChecked}
                isCheckedBookmark={food.isBookMarked}
                onHandleCheckedFoods={() => handleCheckedFoods(food)}
                onHandleBookmarkFoods={() => handleBookmarkFoods(food)}
              />
            );
          })}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CustomButton size="large" text={`${foodList.length}개 선택됨`} theme="secondary" />
          <CustomButton size="large" text="기록하기" theme="primary" onPress={handleRecordButton} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const FoodInfoCard = ({
  name,
  calories,
  serving_size,
  onHandleCheckedFoods,
  onHandleBookmarkFoods,
  isCheckFood,
  isCheckedBookmark,
}) => {
  return (
    <TouchableOpacity style={styles.foodItem}>
      <View>
        <Text style={{ color: 'white', marginBottom: 5, fontSize: FONT_SIZES.sm }}>{name}</Text>
        <Text style={{ color: COLORS.white }}>{serving_size}g</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'white', marginRight: 10, fontSize: FONT_SIZES.sm }}>{calories}kcal</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <TouchableOpacity activeOpacity={0.6} onPress={onHandleCheckedFoods}>
            <Image source={isCheckFood ? checkIcon : PlusIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={onHandleBookmarkFoods}>
            <Image source={isCheckedBookmark ? BookmarkOnIcon : BookmarkOffIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
    fontFamily: FONTS.PRETENDARD[700],
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
    flexDirection: 'column',
    gap: 10,
  },
});
export default FoodSearch;
