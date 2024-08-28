import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';

const PlusButtonIcon = require('../../../assets/images/dietDiary/PluscircleButton.png');
const BookmarkIcon = require('../../../assets/images/dietDiary/bookmark.png');

const FoodRecord = () => {
  const [searchText, setSearchText] = useState('');
  const [tag, setTag] = useState(['최근', '북마크', '직접 등록']);
  const [activeTag, setActiveTag] = useState('최근');

  const handleTag = (type) => {
    setActiveTag(type);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <HeaderComponents title="음식 기록" />
      <View style={styles.container}>
        <CustomInput
          style={{ padding: 10 }}
          theme="search"
          size="large"
          placeholder="음식명 검색"
          onChangeText={searchText}
        />

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

        <CustomButton size="large" text="기록하기" theme="primary" />
      </View>
    </SafeAreaView>
  );
};

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
});

export default FoodRecord;
