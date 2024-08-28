import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';

/**
 * @param {{
 * options: number[];
 * selectedOption: number | null;
 * setSelectedOption: (value: number | null) => void;
 * disabledOptions?: number[]; // 비활성화할 옵션 배열
 * }}
 */

const OptionSelector = ({ options, selectedOption, setSelectedOption, disabledOptions = [] }) => {
  return (
    <View style={styles.optionsContainer}>
      {options.map((item) => {
        const isDisabled = disabledOptions.includes(item);
        return (
          <Pressable
            key={item}
            style={[styles.optionWrapper, selectedOption === item && styles.selected, isDisabled && styles.disabled]}
            onPress={() => !isDisabled && setSelectedOption(item)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.optionText}>{item}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

// Animations for press in and out
const handlePressIn = () => {
  Animated.timing(pressedValue, {
    toValue: 0.8,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

const handlePressOut = () => {
  Animated.timing(pressedValue, {
    toValue: 1,
    duration: 100,
    useNativeDriver: true,
  }).start();
};

const pressedValue = new Animated.Value(1);

const styles = StyleSheet.create({
  optionsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  optionWrapper: {
    paddingVertical: 5.5,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: COLORS.darkGrey,
    alignItems: 'center',
    flexDirection: 'row',
  },
  optionText: {
    width: 21,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard',
    color: COLORS.white,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: COLORS.primary,
  },
  disabled: {
    backgroundColor: COLORS.lightGrey,
    opacity: 0.5,
  },
});

export default OptionSelector;
