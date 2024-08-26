import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';

/**
 * @param {{
 * options: number[];
 * selectedOption: number | null;
 * setSelectedOption: (value: number | null) => void;
 * }}
 */
const OptionSelector = ({ options, selectedOption, setSelectedOption }) => {
  return (
    <View style={styles.optionsContainer}>
      {options.map((item) => (
        <Pressable
          key={item}
          style={[styles.optionWrapper, selectedOption === item && styles.selected]}
          onPress={() => setSelectedOption(item)}
        >
          <Text style={styles.optionText}>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};

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
});

export default OptionSelector;
