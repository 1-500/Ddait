import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/space';
import CustomButton from './CustomButton';

const FriendOptionBottomSheet = forwardRef((props, ref) => {
  const { isFriend } = props; // props에서 isFriend를 구조 분해 할당

  const snapPoints = [350];

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />,
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
        <CustomButton text="1:1 따잇 걸기!" onPress={() => {}} theme="primary" size="large" />
        {!isFriend ? (
          <CustomButton text="친구 신청" onPress={() => {}} theme="primary" size="large" />
        ) : (
          <CustomButton text="차단" onPress={() => {}} theme="error" size="large" />
        )}
        <CustomButton text="취소" onPress={() => {}} theme="block" size="large" />
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
    padding: SPACING.lg,
    gap: 16,
  },
});

export default FriendOptionBottomSheet;
