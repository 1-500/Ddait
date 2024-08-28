import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FONT_SIZES, HEADER_FONT_SIZES } from '../../constants/font';
import useUserFormStore from '../../store/sign/signup';
import DatePickerBottomSheet from '../DatePickerBottomSheet';

const windowWidth = Dimensions.get('window').width;

const BirthDayRegisterForm = () => {
  const { selectedDate, setSelectedDate, nickName } = useUserFormStore();

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '70%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={styles.topText}>{nickName}님의 생일을 알려주세요!</Text>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Text style={styles.dateText}>
            {selectedDate.year} / {selectedDate.month} / {selectedDate.day}
          </Text>
        </TouchableOpacity>
        <DatePickerBottomSheet
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          title="생년월일 입력해주세요"
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
        />
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
  },
  topText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20,
  },
  dateText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#383838',
    width: windowWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: HEADER_FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: 20,
  },
  pickersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    color: 'white',
    backgroundColor: 'transparent',
    height: 150,
  },
  button: {
    backgroundColor: '#5D5DFC',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BirthDayRegisterForm;
