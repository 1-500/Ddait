import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { ELEMENT_HORIZONTAL_MARGIN, ELEMENT_VERTICAL_MARGIN } from '../../constants/space';
import CustomButton from '../CustomButton';
const greatImg = require('../../assets/images/great.png');
const OnboardingBottomSheet = forwardRef((props, ref) => {
  const snapPoints = [320];

  const renderBackdrop = useCallback(
    (prop) => <BottomSheetBackdrop {...prop} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />,
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.background}
      handleIndicatorStyle={{ backgroundColor: COLORS.white }}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.container}>
        <View style={styles.contents}>
          <Text style={styles.welcomeText}> 따잇에 오신 걸 환영해요! </Text>
          <Text style={styles.welcomeSubText}> 간단한 정보만 입력하고 바로 시작해요!</Text>
          <Image source={greatImg} />
        </View>
        <CustomButton text="시작하기" theme="primary" size="large" />
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.darkBackground,
  },
  container: {
    flex: 1,
    ...ELEMENT_HORIZONTAL_MARGIN,
    ...ELEMENT_VERTICAL_MARGIN,
    justifyContent: 'space-between',
  },
  welcomeText: {
    fontSize: FONT_SIZES.xl,
    color: COLORS.white,
    fontFamily: FONTS.PRETENDARD[700],
    marginBottom: 10,
  },
  contents: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeSubText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default OnboardingBottomSheet;
