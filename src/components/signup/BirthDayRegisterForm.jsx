import dayjs from 'dayjs';
import React, { useCallback, useMemo, useRef } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { FONTS, HEADER_FONT_SIZES } from '../../constants/font';
import useUserFormStore from '../../store/sign/signup';
import DatePickerBottomSheet from '../BottomSheet/DatePickerBottomSheet';
const windowWidth = Dimensions.get('window').width;

const BirthDayRegisterForm = () => {
  const { selectedDate, setSelectedDate, nickName } = useUserFormStore();

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => (Platform.OS === 'ios' ? ['70%', '60%'] : ['70%', '50%']), []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>{nickName}님의 생일을 알려주세요!</Text>
      <TouchableOpacity onPress={handlePresentModalPress}>
        <Text style={styles.dateText}>{dayjs(selectedDate).format('YYYY/MM/DD')}</Text>
      </TouchableOpacity>
      <DatePickerBottomSheet
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        maximumDate={new Date()}
        title="생년월일을 입력해주세요"
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
      />
    </View>
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
    fontFamily: FONTS.PRETENDARD[700],
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
    fontFamily: FONTS.PRETENDARD[600],
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
    fontFamily: FONTS.PRETENDARD[400],
  },
});

export default BirthDayRegisterForm;
