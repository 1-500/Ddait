import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import React, { forwardRef, useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { HEADER_FONT_SIZES } from '../constants/font';
import { getDays, getMonths, getYears } from '../utils/date';
import CustomButton from './CustomButton';

const windowWidth = Dimensions.get('window').width;
const months = getMonths();
const years = getYears();
const days = getDays();

// snapPoints [] array형태로 받음 ['50%','70%'] 화면상에서 몇퍼센트 비율로 보여줄지 설정
// 필요한 페이지에서 BottomSheetModalProvider 최상단에 주입

// 상위 컴포넌트에서  옆에있는 상태 정의 const [selectedDate, setSelectedDate] = useState({
//     month: '9',
//     day: '17',
//     year: '2021',
//   });
//
// title 은 헤더 text

const DatePickerBottomSheet = forwardRef(({ snapPoints, title, selectedDate, setSelectedDate }, ref) => {
  const snapPointsValue = useMemo(() => snapPoints, [snapPoints]);

  const handleCloseModal = () => ref.current?.close();

  return (
    <BottomSheetModal
      ref={ref}
      index={1}
      snapPoints={snapPointsValue}
      backgroundComponent={({ style }) => <View style={[style, styles.pickerContainer]} />}
    >
      <BottomSheetView>
        <View style={styles.pickerContainer}>
          <Text style={styles.headerText}>{title}</Text>
          <View style={styles.pickersWrapper}>
            <Picker
              selectedValue={selectedDate?.year}
              style={styles.picker}
              onValueChange={(year) => setSelectedDate((prev) => ({ ...prev, year }))}
            >
              {years.map((year) => (
                <Picker.Item key={year.value} label={year.label} value={year.value} color="white" />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedDate?.month}
              style={styles.picker}
              onValueChange={(month) => setSelectedDate((prev) => ({ ...prev, month }))}
            >
              {months.map((month) => (
                <Picker.Item key={month.value} label={month.label} value={month.value} color="white" />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedDate?.day}
              style={styles.picker}
              onValueChange={(day) => setSelectedDate((prev) => ({ ...prev, day }))}
            >
              {days.map((day) => (
                <Picker.Item key={day.value} label={day.label} value={day.value} color="white" />
              ))}
            </Picker>
          </View>

          <View style={{ marginTop: 10 }}>
            <CustomButton size="large" text="완료" theme="primary" onPress={handleCloseModal} />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DatePickerBottomSheet;

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: '#383838',
    width: windowWidth,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  headerText: {
    color: 'white',
    fontSize: HEADER_FONT_SIZES.lg,
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
});
