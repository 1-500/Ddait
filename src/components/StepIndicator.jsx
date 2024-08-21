import React from 'react';
import { StyleSheet, View } from 'react-native';

const StepIndicator = ({ currentStep, steps }) => {
  const stepIndicators = Array.from({ length: steps }, (_, index) => (
    <View key={index} style={[styles.step, index === currentStep - 1 ? styles.activeStep : styles.inactiveStep]} />
  ));
  return <View style={styles.container}>{stepIndicators}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  step: {
    height: 7,
    borderRadius: 20,
    flex: 1,
  },
  activeStep: {
    backgroundColor: '#5d5dfc',
    shadowColor: 'rgba(255, 255, 255, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 4,
  },
  inactiveStep: {
    backgroundColor: '#000',
  },
});

export default StepIndicator;
