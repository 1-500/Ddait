import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../constants/colors';
import { FONT_SIZES } from '../constants/font';
import { RADIUS } from '../constants/radius';

const DiaryTypePicker = () => {
  const [types, setTypes] = useState(['웨이트', '러닝', '식단', '등산']);
  const [activeType, setActiveType] = useState('식단');

  const navigation = useNavigation();
  const handleTypePress = (type) => {
    if (type === '식단') {
      navigation.navigate('FoodDiary', {
        screen: 'FoodDiaryScreen',
      });
    } else if (type === '웨이트') {
      navigation.navigate('WorkoutDiary', {
        screen: 'WorkoutDiaryScreen',
      });
    }
    setActiveType(type);
  };
  return (
    <View style={styles.container}>
      {types.map((type, index) => (
        <TouchableOpacity
          key={index}
          style={type === activeType ? styles.activeType : styles.type}
          onPress={() => handleTypePress(type)}
        >
          <Text style={type === activeType ? styles.activeTypeText : styles.typeText}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  type: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: RADIUS.small,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLORS.greyDark,
  },
  activeType: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: {
    color: TEXT_COLORS.secondary,
    fontSize: FONT_SIZES.md,
  },
  activeTypeText: {
    color: TEXT_COLORS.primary,
    fontSize: FONT_SIZES.md,
  },
});
export default DiaryTypePicker;
