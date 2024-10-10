import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { deleteFriend, requestFriend } from '../../apis/friend';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/space';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';
import CustomButton from '../CustomButton';

const FriendOptionBottomSheet = forwardRef((props, ref) => {
  const { showToast } = useToastMessageStore();
  const { relation, memberData, onUpdateData, setAlertConfig, isCompetition, competitionRoomId, navigation } = props;
  const snapPoints = [260];

  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />,
    [],
  );

  const showAlert = (config) => {
    setAlertConfig({ ...config, visible: true });
  };

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const onPressRequest = async () => {
    try {
      const memberId = memberData.id;
      const res = await requestFriend(memberId);
      const nickname = res.data.friend_member_nickname;
      showToast(`${nickname}님에게 친구 요청을 보냈어요.`, 'success', 3000, 'bottom');
      if (isCompetition) {
        onUpdateData(res.data);
      }
      handleClose();
    } catch (error) {
      showAlert({
        title: '친구 요청 실패',
        message: error.message,
        showCancel: false,
        onConfirm: hideAlert,
      });
      handleClose();
    }
  };

  const handleDelete = async (type) => {
    const tableId = memberData.table_id;
    const alertTitle = type === 'block' ? '친구 차단' : '친구 신청 취소';
    const alertMessage = `${memberData.nickname}님을 정말 차단하시겠어요?`;

    if (type === 'block') {
      showAlert({
        title: alertTitle,
        message: alertMessage,
        onConfirm: async () => {
          try {
            await deleteFriend(tableId);
            showToast(`${memberData.nickname}님을 차단했어요.`, 'success', 3000, 'top', 80);
            onUpdateData();
            hideAlert();
          } catch (error) {
            showToast(error.message, 'error', 3000, 'top', 80);
          }
        },
      });
    } else {
      try {
        await deleteFriend(tableId);
        showToast(`${memberData.nickname}님에게 보낸 요청을 취소했어요.`, 'success', 3000, 'top', 80);
        onUpdateData();
      } catch (error) {
        showToast(error.message, 'error', 3000, 'top', 80);
      }
    }
    handleClose();
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
        {!isCompetition && <CustomButton text="1:1 따잇 걸기!" onPress={() => {}} theme="primary" size="large" />}
        {relation === 'friend' ? (
          <CustomButton text="차단" onPress={() => handleDelete('block')} theme="error" size="large" />
        ) : relation === 'none' ? (
          <CustomButton text="친구 신청" onPress={onPressRequest} theme="primary" size="large" />
        ) : relation === 'requested' ? (
          <CustomButton text="신청 취소" onPress={() => handleDelete('req')} theme="error" size="large" />
        ) : null}
        {isCompetition && (
          <CustomButton
            text="신고하기"
            onPress={() =>
              navigation.navigate('MemberReport', {
                reported_member: memberData,
                competition_room_id: competitionRoomId,
              })
            }
            theme="error"
            size="large"
          />
        )}
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
