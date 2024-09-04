import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BACKGROUND_COLORS, COLORS, TEXT_COLORS } from '../constants/colors';
import { FONT_SIZES } from '../constants/font';
import { RADIUS } from '../constants/radius';
import useDiaryCalendarStore from '../store/food/calendar';

const DiaryTypePicker = () => {
  const { types, activeType, setActiveType } = useDiaryCalendarStore();

  const handleTypePress = (type) => {
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
