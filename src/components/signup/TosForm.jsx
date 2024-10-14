import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';

const TosForm = ({ onSubmit }) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  useEffect(() => {
    if (isChecked1 && isChecked2) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [isChecked1, isChecked2]);

  const handleAllChecked = () => {
    const newValue = !isAllChecked;
    setIsAllChecked(newValue);
    setIsChecked1(newValue);
    setIsChecked2(newValue);
    onSubmit(newValue); // 모두 동의 상태 업데이트
  };

  const handleCheck = (setter, value) => {
    const newValue = !value;
    setter(newValue);
    onSubmit(isChecked1 && isChecked2); // 개별 체크박스 상태에 따라 업데이트
  };

  return (
    <View style={styles.container}>
      <View style={styles.allCheckContainer}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleAllChecked} style={styles.checkbox}>
            <View style={isAllChecked ? styles.checked : styles.unchecked} />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>모두 동의</Text>
        </View>
        <Text style={styles.descMsg}>서비스 이용을 위해 아래 약관에 모두 동의합니다.</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => handleCheck(setIsChecked1, isChecked1)} style={styles.checkbox}>
            <View style={isChecked1 ? styles.checked : styles.unchecked} />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>이용약관 동의</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => handleCheck(setIsChecked2, isChecked2)} style={styles.checkbox}>
            <View style={isChecked2 ? styles.checked : styles.unchecked} />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>개인정보 처리방침 동의</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  allCheckContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingBottom: 20,
    marginBottom: 20,
    gap: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[400],
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: COLORS.white,
  },
  unchecked: {
    width: 14,
    height: 14,
  },
  descMsg: {
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.lightGrey,
    fontSize: FONT_SIZES.xs,
  },
});

export default TosForm;
