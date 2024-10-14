import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

const windowWidth = Dimensions.get('window');
import React, { forwardRef, useMemo } from 'react';

import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import CustomButton from '../CustomButton';

const DatePickerBottomSheet = forwardRef(
  ({ snapPoints, title, selectedDate, setSelectedDate, minimumDate, maximumDate }, ref) => {
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
            <View style={styles.datePickerWrapper}>
              <DatePicker
                locale="ko-kr"
                theme="dark"
                dividerColor={COLORS.primary}
                mode="date"
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                date={selectedDate}
                onDateChange={setSelectedDate}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <CustomButton size="large" text="완료" theme="primary" onPress={handleCloseModal} />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

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
  datePickerWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    color: 'white',
    backgroundColor: 'transparent',
    height: 150,
  },
});
