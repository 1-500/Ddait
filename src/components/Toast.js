import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../constants/colors';
import { useToastMessageStore } from '../store/toastMessage/toastMessage';
import Text from './Text';

const Toast = () => {
  const toastValue = useRef(new Animated.Value(0)).current;
  const { top, bottom } = useSafeAreaInsets(); // SafeArea에서 상단 inset 가져오기
  const { visible, message, duration, type, position, handleCancel } = useToastMessageStore((state) => ({
    visible: state.visible,
    message: state.message,
    duration: state.duration,
    type: state.type,
    handleCancel: state.handleCancel,
    position: state.position,
  }));

  const getPointBarColor = () => {
    switch (type) {
      case 'success':
        return COLORS.secondary;
      case 'error':
        return COLORS.red;
      default:
        return COLORS.secondary;
    }
  };

  /*eslint-disable*/
  const toastAnimated = useCallback(() => {
    toastValue.setValue(0);

    Animated.spring(toastValue, {
      toValue: 1,
      useNativeDriver: true,
      delay: 100,
    }).start(({ finished }) => {
      if (finished) {
        // 일정 시간 후 사라질 때 애니메이션 (timing 사용)
        Animated.timing(toastValue, {
          toValue: 0,
          useNativeDriver: true,
          duration: duration || 1000, // 사라질 때의 애니메이션 시간을 지정
        }).start(() => {
          handleCancel(); // 애니메이션이 끝난 후 상태를 변경
        });
      }
    });
  }, [handleCancel]);
  /*eslint-enable*/

  useEffect(() => {
    if (visible) {
      toastAnimated();
    }
  }, [visible, toastAnimated]);

  return visible ? (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        position === 'top' ? { top: 0 } : { bottom: 80 },
        {
          opacity: toastValue,
          transform: [
            {
              translateY: toastValue.interpolate({
                inputRange: [0, 1],
                outputRange: position === 'top' ? [-top - 10, top] : [bottom + 100, -(bottom + 50)],
              }),
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
            {message}
          </Text>
        </View>
      </View>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
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
