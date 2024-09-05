import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../constants/colors';
import Text from './Text';

const Toast = ({ text, visible, handleCancel, duration, type = 'success' }) => {
  const toastValue = useRef(new Animated.Value(0)).current;
  const { top, bottom } = useSafeAreaInsets(); // SafeArea에서 상단 inset 가져오기
  const getPointBarColor = () => {
    switch (type) {
      case 'success':
        return COLORS.secondary;
      case 'error':
        return COLORS.red;
      default:
        return COLORS.secondary; // 기본 색상
    }
  };

  const toastAnimated = useCallback(() => {
    toastValue.setValue(0);
    Animated.spring(toastValue, {
      toValue: 1,
      useNativeDriver: true,
      delay: 100,
    }).start(({ finished }) => {
      if (finished) {
        handleCancel();
        Animated.timing(toastValue, {
          toValue: 0,
          useNativeDriver: true,
          duration: 150,
          delay: duration || 1000,
        }).start();
      }
    });
  }, [duration, handleCancel, toastValue]);

  useEffect(() => {
    if (visible) {
      toastAnimated();
    }
  }, [toastAnimated, visible]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        {
          opacity: toastValue,
          transform: [
            {
              translateY: toastValue.interpolate({
                inputRange: [0, 1],
                outputRange: [bottom - 10, bottom - 30],
              }),
              //   translateY: toastValue.interpolate({
              //     inputRange: [0, 1],
              //     outputRange: [-top - 30, top],
              //   }),
            },
            { scale: toastValue.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) },
          ],
        },
      ]}
    >
      <View style={styles.toastContainer}>
        <View style={[styles.pointBar, { backgroundColor: getPointBarColor() }]} />
        <View style={styles.toastContents}>
          <Text type="body3-regular" color="#fff">
            {text}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    // top: 0,
    bottom: 60,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(58,58,58,0.9)',
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 8,
  },
  pointBar: {
    width: 5,
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
    marginRight: 12,
  },
  toastContents: {
    justifyContent: 'center',
  },
});

export default Toast;
