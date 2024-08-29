import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { COLORS } from '../constants/colors';

const Toggle = ({ isOn, onToggle }) => {
  const translateX = useRef(new Animated.Value(isOn ? 26 : 4)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOn ? 26 : 4,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isOn, translateX]);

  return (
    <Pressable
      style={({ pressed }) => [styles.switchContainer, isOn ? styles.switchOn : styles.switchOff]}
      onPress={onToggle}
    >
      <Animated.View style={[styles.toggleThumb, { transform: [{ translateX }] }]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    borderRadius: 15,
    width: 54,
    justifyContent: 'space-between',
  },
  switchOn: {
    backgroundColor: '#8b8bff73',
  },
  switchOff: {
    backgroundColor: COLORS.darkGrey,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 1, // 안드로이드 그림자
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
});

export default Toggle;
