import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const windowWidth = Dimensions.get('window');
import React, { forwardRef, useMemo } from 'react';

import { FONT_SIZES, FONTS } from '../../constants/font';
import { getDays, getMonths, getYears } from '../../utils/date';
import CustomButton from '../CustomButton';

const months = getMonths();
const years = getYears();
const days = getDays();

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
              selectedValue={selectedDate.year}
              style={styles.picker}
              onValueChange={(year) =>
                setSelectedDate({ month: selectedDate.month, year: year, day: selectedDate.day })
              }
            >
              {years.map((year) => (
                <Picker.Item key={year.value} label={year.label} value={year.value} color="white" />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedDate.month}
              style={styles.picker}
              onValueChange={(month) =>
                setSelectedDate({ month: month, year: selectedDate.year, day: selectedDate.day })
              }
            >
              {months.map((month) => (
                <Picker.Item key={month.value} label={month.label} value={month.value} color="white" />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedDate.day}
              style={styles.picker}
              onValueChange={(day) => setSelectedDate({ month: selectedDate.month, year: selectedDate.year, day: day })}
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
    fontSize: FONT_SIZES.lg,
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
});
