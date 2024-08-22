import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TAG_COLORS } from '../constants/colors';
import { FONT_WEIGHTS } from '../constants/font';
import { FONT_SIZES } from '../constants/font';
import { RADIUS } from '../constants/radius';

// prettier-ignore
const TEXT_TO_TYPE = {
  '다이어트': 'diet',
  '걷기': 'walking',
  '러닝': 'running',
  '등산': 'climb',
  '웨이트트레이닝': 'weight',
  '1:1': 'competition',
  '랭킹전': 'competition',
  '경쟁 세부 테마': 'diet',
};

/**
 * @param {{
 * size: 'small' | 'big';
 * text: string;
 * }} param0
 */

const CustomTag = ({ size, text }) => {
  const type = TEXT_TO_TYPE[text] || 'default';

  return (
    <View style={[styles[`container_${size}`], styles[`type_${type}`]]}>
      <Text style={[styles.text, styles[`text_${size}`]]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container_small: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.large,
  },
  container_big: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.small,
  },
  text: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  text_small: {
    fontSize: FONT_SIZES.xxs,
  },
  text_big: {
    fontSize: FONT_SIZES.sm,
  },
  type_diet: {
    backgroundColor: TAG_COLORS.diet,
  },
  type_walking: {
    backgroundColor: TAG_COLORS.walking,
  },
  type_running: {
    backgroundColor: TAG_COLORS.runnging,
  },
  type_climb: {
    backgroundColor: TAG_COLORS.climb,
  },
  type_weight: {
    backgroundColor: TAG_COLORS.weight,
  },
  type_competition: {
    backgroundColor: TAG_COLORS.competition,
  },
  type_default: {
    backgroundColor: TAG_COLORS.default,
  },
});

export default CustomTag;
