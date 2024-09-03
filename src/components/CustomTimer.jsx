import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { COLORS, TEXT_COLORS } from '../constants/colors';
import { BODY_FONT_SIZES } from '../constants/font';

const CustomTimer = ({ time, setTime }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('00');
  const [inputSeconds, setInputSeconds] = useState('30');
  const [isSettingMode, setIsSettingMode] = useState(false);
  const intervalId = useRef(null);

  const updateTime = useCallback(() => {
    setTime((prevTime) => {
      const { minutes, seconds } = prevTime;
      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId.current);
        intervalId.current = null;
        Alert.alert('휴식 완료', '휴식 시간이 끝났습니다.');
        return prevTime;
      } else if (seconds === 0) {
        return { minutes: minutes - 1, seconds: 59 };
      } else {
        return { ...prevTime, seconds: seconds - 1 };
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
    setTime({ minutes: parseInt(inputMinutes, 10), seconds: parseInt(inputSeconds, 10) });
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const handleSetTime = () => {
    setTime({ minutes: parseInt(inputMinutes, 10), seconds: parseInt(inputSeconds, 10) });
    setIsSettingMode(!isSettingMode);
  };

  return (
    <View style={styles.container}>
      {isSettingMode && (
        <>
          <Text style={styles.timerText}>
            {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={handleStartPause}>
              <Text style={styles.buttonText}>{isRunning ? '일시정지' : '시작'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>초기화</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {!isSettingMode && (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputMinutes}
              onChangeText={setInputMinutes}
              keyboardType="number-pad"
              maxLength={2}
            />
            <Text style={styles.colon}>:</Text>
            <TextInput
              style={styles.input}
              value={inputSeconds}
              onChangeText={setInputSeconds}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          <TouchableOpacity style={styles.setButton} onPress={handleSetTime}>
            <Text style={styles.buttonText}>설정</Text>
          </TouchableOpacity>
        </>
      )}
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    width: 50,
    textAlign: 'center',
    fontSize: BODY_FONT_SIZES.lg,
    color: TEXT_COLORS.primary,
  },
  colon: {
    fontSize: BODY_FONT_SIZES.lg,
    color: TEXT_COLORS.primary,
    marginHorizontal: 10,
  },
  setButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
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
