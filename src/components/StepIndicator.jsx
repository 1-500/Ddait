import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet } from 'react-native';

import { COLORS } from '../constants/colors';
import { RADIUS } from '../constants/radius';
import { SPACING } from '../constants/space';

const { width } = Dimensions.get('window');

/**
 * @param {{
 *   currentStep: number;
 *   steps: number;
 *   onPress: (step: number) => void;
 *   activeColor?: string;
 *   backgroundColor?: string;
 * }}
 */
const StepIndicator = ({
  currentStep,
  steps,
  onPress,
  activeColor = COLORS.primary,
  backgroundColor = COLORS.black,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const stepWidth = (width - 40 - (steps - 1) * SPACING.xs) / steps;
  const stepGap = SPACING.xs;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: currentStep - 1,
      useNativeDriver: false,
      duration: 300,
    }).start();
  }, [animatedValue, currentStep]);

  const translateX = animatedValue.interpolate({
    inputRange: Array.from({ length: steps }, (_, index) => index),
    outputRange: Array.from({ length: steps }, (_, index) => index * (stepWidth + stepGap)),
  });

  const handlePress = (index) => {
    if (onPress) {
      onPress(index + 1);
    }
  };

  const stepIndicators = Array.from({ length: steps }, (_, index) => (
    <Pressable key={index} style={[styles.bar, { backgroundColor }]} onPress={() => handlePress(index)} />
  ));

  return (
    <Pressable style={styles.container}>
      {stepIndicators}
      <Animated.View
        style={[
          styles.bar,
          styles.activeBar,
          { transform: [{ translateX }], backgroundColor: activeColor, width: stepWidth },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    gap: SPACING.xs,
  },
  bar: {
    height: 7,
    borderRadius: RADIUS.small,
    flex: 1,
  },
  activeBar: {
    position: 'absolute',
    shadowColor: 'rgba(255, 255, 255, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 1,
  },
});

export default StepIndicator;
