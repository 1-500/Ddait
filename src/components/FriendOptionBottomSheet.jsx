import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { cancleRequest, requestFriend } from '../apis/friend';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/space';
import CustomButton from './CustomButton';

const FriendOptionBottomSheet = forwardRef((props, ref) => {
  const { relation, memberData, onUpdateData } = props;
  const snapPoints = [350];
  // console.log('clicked member:', memberData); //불필요한 리렌더링 체크 후 추후 수정 필요
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />,
    [],
  );

  const onPressRequest = async () => {
    try {
      const memberId = memberData.id;
      const res = await requestFriend(memberId);
      const nickname = res.data.friend_member_nickname;
      Alert.alert('친구 추가', `${nickname}님에게 친구 요청을 보냈어요.\n 승인을 기다려주세요!`, [
        { onPress: () => ref.current?.close() },
      ]);
    } catch (error) {
      Alert.alert('친구 추가 실패', error.message);
    }
  };

  const onPressCancel = () => {
    const tableId = memberData.table_id;
    Alert.alert('친구 신청 취소', `${memberData.nickname}님에게 보낸 친구 요청을 정말 취소하시겠어요?`, [
      {
        text: '취소',
        onPress: handleClose,
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: async () => {
          try {
            await cancleRequest(tableId);
            handleClose();
            onUpdateData();
          } catch (error) {
            // 토스트로 변경
            //Alert.alert('친구 신청 취소 실패', error.message);
          }
        },
      },
    ]);
  };

  const handleClose = () => {
    ref.current?.close();
  };

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
        {relation === 'friend' ? (
          <CustomButton text="차단" onPress={() => {}} theme="error" size="large" />
        ) : relation === 'none' ? (
          <CustomButton text="친구 신청" onPress={onPressRequest} theme="primary" size="large" />
        ) : relation === 'requested' ? (
          <CustomButton text="신청 취소" onPress={onPressCancel} theme="error" size="large" />
        ) : null}
        <CustomButton text="취소" onPress={handleClose} theme="block" size="large" />
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
