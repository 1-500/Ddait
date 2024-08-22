import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet } from 'react-native';

import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

const StepIndicator = ({ currentStep, steps, onPress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const stepWidth = (width - 40 - (steps - 2) * 8) / steps;
  const stepGap = 8;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: currentStep - 1,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, currentStep]);

  // 각 단계 간 위치 계산
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
    <Pressable key={index} style={styles.bar} onPress={() => handlePress(index)} />
  ));

  return (
    <Pressable style={styles.container}>
      {stepIndicators}
      <Animated.View style={[styles.bar, styles.activeBar, { transform: [{ translateX }] }, { width: stepWidth }]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    gap: 8,
  },
  bar: {
    height: 7,
    borderRadius: 20,
    flex: 1,
    backgroundColor: COLORS.black,
  },
  activeBar: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    shadowColor: 'rgba(255, 255, 255, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 1,
  },
});

export default StepIndicator;
