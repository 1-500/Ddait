import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, TEXT_COLORS } from '../constants/colors';
import { BODY_FONT_SIZES } from '../constants/font';

const CustomTimer = ({ time, setTime }) => {
  const [isRunning, setIsRunning] = useState(false);
  const intervalId = useRef(null);

  const updateTime = useCallback(() => {
    setTime((prevTime) => {
      const { minutes, seconds } = prevTime;
      if (seconds === 59) {
        return { minutes: minutes + 1, seconds: 0 };
      } else {
        return { ...prevTime, seconds: seconds + 1 };
      }
    });
  }, [setTime]);

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(updateTime, 1000);
    } else if (!isRunning && intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    return () => clearInterval(intervalId.current);
  }, [isRunning, updateTime]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime({ minutes: 0, seconds: 0 });
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartPause}>
          <Text style={styles.buttonText}>{isRunning ? '일시정지' : '시작'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>재설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomTimer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: BODY_FONT_SIZES.lg,
    color: TEXT_COLORS.primary,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: BODY_FONT_SIZES.md,
  },
});
