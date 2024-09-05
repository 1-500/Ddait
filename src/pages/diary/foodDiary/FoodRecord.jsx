import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
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

import { getFoodBySearch } from '../../../apis/food/index';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { debounce } from '../../../utils/foodDiary/debounce';

const PlusButtonIcon = require('../../../assets/images/dietDiary/PluscircleWhiteButton.png');
const BookmarkIcon = require('../../../assets/images/dietDiary/bookmarkWhite.png');

const FoodRecord = () => {
  const [tag, setTag] = useState(['최근', '북마크', '직접등록']);
  const [activeTag, setActiveTag] = useState('최근');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const navigation = useNavigation();
  const handleTag = (type) => {
    setActiveTag(type);
  };
  const handleModal = () => {
    setIsVisibleModal(!isVisibleModal);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <HeaderComponents title="음식 기록" />
      <View style={styles.container}>
        <View style={{ marginVertical: 5 }}>
          <CustomInput
            style={{ padding: 10 }}
            theme="search"
            size="large"
            placeholder="음식명 검색"
            onPress={() => navigation.navigate('FoodDiary', { screen: 'FoodSearchScreen' })}
          />
        </View>

        <View style={styles.tagContainer}>
          {tag.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={type === activeTag ? styles.activeTag : styles.tag}
              onPress={() => handleTag(type)}
            >
              <Text style={type === activeTag ? styles.activeTagText : styles.tagText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView style={styles.foodListContainer}>
          <View style={styles.foodItem}>
            <View>
              <Text style={{ color: 'white', marginBottom: 5, fontSize: FONT_SIZES.sm }}>햇반</Text>
              <Text style={{ color: COLORS.white }}>100g</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: 'white', marginRight: 10, fontSize: FONT_SIZES.sm }}>132kcal</Text>
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
        </ScrollView>

        <View style={styles.buttonContainer}>
          {activeTag === '직접등록' ? (
            <>
              <CustomButton size="medium" text="직접 등록하기" theme="secondary" onPress={handleModal} />
              <CustomButton size="medium" text="기록하기" theme="primary" />
            </>
          ) : (
            <CustomButton size="large" text="기록하기" theme="primary" />
          )}
        </View>
      </View>
      <Modal visible={isVisibleModal} animationType="slide" transparent={true} onRequestClose={handleModal}>
        <TouchableWithoutFeedback onPress={handleModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={{ marginVertical: 10 }}>
                <CustomInput size="large" theme="user" placeholder="음식명을 입력하세요" />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginVertical: 20,
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
              <CustomButton theme="primary" size="large" text="등록하기" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const FoodCard = () => {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
  },

  tagContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  tag: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: RADIUS.large,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
  },
  activeTag: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTagText: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.sm,
  },
  tagText: {
    color: TEXT_COLORS.secondary,
    fontSize: FONT_SIZES.sm,
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

export default FoodRecord;
