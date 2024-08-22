import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const months = [
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
];

const days = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }));

const years = Array.from({ length: 10 }, (_, i) => {
  const year = 2020 + i;
  return { label: `${year}`, value: `${year}` };
});

const windowWidth = Dimensions.get('window').width;

const BirthDayRegisterForm = () => {
  const [selectedMonth, setSelectedMonth] = useState('9');
  const [selectedDay, setSelectedDay] = useState('17');
  const [selectedYear, setSelectedYear] = useState('2021');
  const bottomSheetModalRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ['50%', '80%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModal = () => bottomSheetModalRef.current.close();

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={styles.topText}>나라짱짱님의 생일을 알려주세요!</Text>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Text style={styles.dateText}>
            {selectedYear} / {selectedMonth} / {selectedDay}
          </Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundComponent={({ style }) => <View style={[style, styles.pickerContainer]} />}
        >
          <BottomSheetView>
            <View style={styles.pickerContainer}>
              <Text style={styles.headerText}>생년월일을 입력해주세요.</Text>
              <View style={styles.pickersWrapper}>
                <Picker
                  selectedValue={selectedMonth}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                >
                  {months.map((month) => (
                    <Picker.Item key={month.value} label={month.label} value={month.value} color="white" />
                  ))}
                </Picker>
                <Picker
                  selectedValue={selectedDay}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedDay(itemValue)}
                >
                  {days.map((day) => (
                    <Picker.Item key={day.value} label={day.label} value={day.value} color="white" />
                  ))}
                </Picker>
                <Picker
                  selectedValue={selectedYear}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedYear(itemValue)}
                >
                  {years.map((year) => (
                    <Picker.Item key={year.value} label={year.label} value={year.value} color="white" />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
                <Text style={styles.buttonText}>완료</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
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
    fontSize: 20,
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
