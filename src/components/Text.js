import React from 'react';
import { Animated, StyleSheet } from 'react-native';

// TYPES
// STYLES
// import fonts from '../../../styles/fonts';
import { FONTS } from '../constants/font';

/**
 *
 * @param {{type?: 'bigheadline1-bold' | 'bigheadline1-medium' | 'bigheadline1-regular' | 'bigheadline2-bold' | 'bigheadline2-medium' | 'bigheadline2-regular' | 'headline1-bold' | 'headline1-medium' | 'headline1-regular' | 'headline2-bold' | 'headline2-medium' | 'headline2-regular' | 'title1-bold' | 'title1-medium' | 'title1-regular' | 'title2-bold' | 'title2-medium' | 'title2-regular' | 'title3-bold' | 'title3-medium' | 'title3-regular' | 'title4-bold' | 'title4-medium' | 'title4-regular' | 'body1-bold' | 'body1-medium' | 'body1-regular' | 'body2-bold' | 'body2-medium' | 'body2-regular' | 'body3-bold' | 'body3-medium' | 'body3-regular' | 'body4-bold' | 'body4-medium' | 'body4-regular' | 'body5-bold' | 'body5-medium' | 'body5-regular'; color?: string; letterSpacing?: number; textAlign?: 'left' | 'right' | 'center'; lineThrough?: boolean; customStyle: Pick<import('react-native').TextProps, 'style'>['style'] } & Omit<import('react-native').TextProps, 'allowFontScaling' | 'style'>} param0
 * @returns
 */
const Text = ({
  type,
  color = '#3A3A3A',
  letterSpacing = 0,
  textAlign = 'left',
  lineThrough = false,
  children,
  customStyle,
  ...props
}) => {
  return (
    <Animated.Text
      {...props}
      allowFontScaling={false}
      style={[
        customStyle,
        type ? styles[type] : {},
        { color, letterSpacing, textAlign, textDecorationLine: lineThrough ? 'line-through' : 'none' },
      ]}
    >
      {children}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  'bigheadline1-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 30,
    lineHeight: 46,
  },
  'bigheadline1-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 30,
    lineHeight: 46,
  },
  'bigheadline1-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 30,
    lineHeight: 46,
  },
  'bigheadline2-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 26,
    lineHeight: 40,
  },
  'bigheadline2-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 26,
    lineHeight: 40,
  },
  'bigheadline2-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 26,
    lineHeight: 40,
  },

  'headline1-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 22,
    lineHeight: 34,
  },
  'headline1-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 22,
    lineHeight: 34,
  },
  'headline1-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 22,
    lineHeight: 34,
  },
  'headline2-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 22,
    lineHeight: 22 * 1.5,
  },
  'headline2-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 22,
    lineHeight: 22 * 1.5,
  },
  'headline2-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 22,
    lineHeight: 22 * 1.5,
  },
  'title1-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 19,
    lineHeight: 30,
  },
  'title1-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 19,
    lineHeight: 30,
  },
  'title1-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 19,
    lineHeight: 30,
  },
  'title2-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 18,
    lineHeight: 28,
  },
  'title2-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 18,
    lineHeight: 28,
  },
  'title2-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 18,
    lineHeight: 28,
  },
  'title3-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 17,
    lineHeight: 25.5,
  },
  'title3-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 17,
    lineHeight: 25.5,
  },
  'title3-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 17,
    lineHeight: 25.5,
  },
  'title4-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 16,
    lineHeight: 24,
  },
  'title4-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 16,
    lineHeight: 24,
  },
  'title4-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 16,
    lineHeight: 24,
  },
  'body1-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 15,
    lineHeight: 24,
  },
  'body1-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 15,
    lineHeight: 24,
  },
  'body1-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 15,
    lineHeight: 24,
  },
  'body2-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 14,
    lineHeight: 22,
  },
  'body2-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 14,
    lineHeight: 22,
  },
  'body2-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 14,
    lineHeight: 22,
  },
  'body3-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 13,
    lineHeight: 20,
  },
  'body3-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 13,
    lineHeight: 20,
  },
  'body3-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 13,
    lineHeight: 20,
  },
  'body4-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 12,
    lineHeight: 18,
  },
  'body4-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 12,
    lineHeight: 18,
  },
  'body4-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 12,
    lineHeight: 18,
  },
  'body5-bold': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 11,
    lineHeight: 18,
  },
  'body5-medium': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 11,
    lineHeight: 18,
  },
  'body5-regular': {
    fontFamily: FONTS.PRETENDARD[700],
    fontSize: 11,
    lineHeight: 18,
  },
});

export default Text;
