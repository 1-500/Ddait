import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

const StepIndicator = ({ currentStep, steps }) => {
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

  const stepIndicators = Array.from({ length: steps }, (_, index) => <View key={index} style={styles.step} />);

  return (
    <View style={styles.container}>
      {stepIndicators}
      <Animated.View style={[styles.activeBar, { transform: [{ translateX }] }, { width: stepWidth }]} />
    </View>
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
  step: {
    height: 7,
    borderRadius: 20,
    flex: 1,
    backgroundColor: '#000',
  },
  activeBar: {
    position: 'absolute',
    height: 7,
    borderRadius: 20,
    backgroundColor: '#5d5dfc',
    shadowColor: 'rgba(255, 255, 255, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
  },
});

export default StepIndicator;
