import React, { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text } from 'react-native';

import { BUTTON_COLORS } from '../constants/colors';
import { RADIUS } from '../constants/radius';

/**
 *
 * @param {{
 * theme: 'primary' | 'secondary' | 'error' | 'block';
 * size: 'large' | 'medium' | 'small';
 * states: 'enabled' | 'cta' | 'disabled';
 * onPress: () => void;
 * text: string;
 * loading: boolean;
 * disabled: boolean;
 * }} param0
 */

const CustomButton = ({
  theme,
  size,
  states = 'enabled',
  onPress = () => {},
  text,
  loading = false,
  disabled = false,
}) => {
  const pressedValue = useRef(new Animated.Value(1)).current;

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

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[styles.container, styles[`size_${size}`]]}
      disabled={loading || disabled}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            // backgroundColor: BUTTON_COLORS.primary,
            backgroundColor: styles[`themes_${theme}`].backgroundColor,
            opacity: pressedValue, // 버튼 배경의 투명도를 애니메이션으로 조정
            borderRadius: styles[`size_${size}`].borderRadius,
          },
        ]}
      />
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Animated.Text allowFontScaling={false} style={[styles.text, styles[`states_${states}_text`]]}>
          {text}
        </Animated.Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  themes_primary: {
    backgroundColor: BUTTON_COLORS.primary,
  },
  themes_secondary: {
    backgroundColor: BUTTON_COLORS.secondary,
  },
  themes_error: {
    backgroundColor: BUTTON_COLORS.error,
  },
  themes_block: {
    backgroundColor: BUTTON_COLORS.block,
  },
  size_large: {
    width: '100%',
    borderRadius: RADIUS.large,
  },
  size_medium: {
    width: '50%',
    borderRadius: RADIUS.large,
  },
  size_small: {
    width: '30%',
    borderRadius: RADIUS.small,
  },
  states_enabled: {
    backgroundColor: BUTTON_COLORS.primary,
    paddingVertical: 13,
  },
  states_cta: {
    backgroundColor: BUTTON_COLORS.primary,
    paddingVertical: 11,
  },
  states_disabled: {
    backgroundColor: '#EBEBEB',
    paddingVertical: 13,
  },
  states_cta_text: {
    fontSize: 18,
    lineHeight: 25,
  },
});

export default React.memo(CustomButton);
