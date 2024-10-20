import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { inviteCompetition } from '../../../apis/competition';
import CustomAlert from '../../../components/CustomAlert';
import MemberProfileItem from '../../../components/MemberProfileItem';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../../constants/space';
import { useToastMessageStore } from '../../../store/toastMessage/toastMessage';

const Invite = ({ competitionId, friends }) => {
  const { showToast } = useToastMessageStore();
  const [selectedFriend, setSelectedFriend] = useState();
  const [showInviteAlert, setShowInviteAlert] = useState(false);

  const handleInvite = async () => {
    if (selectedFriend) {
      const res = await inviteCompetition(competitionId, selectedFriend.id);
      if (res.data.status === 201) {
        showToast('초대를 성공적으로 보냈어요.', 'success');
      } else {
        // 추후에 에러 별로 토스트 메시지 변경
        showToast(res.data.message, 'error');
      }
      setSelectedFriend(null);
    }
  };

  return (
    <View style={[{ flex: 1 }, LAYOUT_PADDING]}>
      <FlatList
        data={friends}
        keyExtractor={(item, index) => `${item.nickname}${item.preferred_sport}${index}`}
        renderItem={({ item }) => (
          <MemberProfileItem
            memberData={item}
            rightBtn="invite"
            onRightBtnPress={() => {
              setSelectedFriend(item);
              setShowInviteAlert(true);
            }}
          />
        )}
        ListHeaderComponent={
          <View>
            <TouchableOpacity
              style={styles.inviteBtn}
              activeOpacity={0.6}
              onPress={() => showToast('구현 예정', 'error')}
            >
              <Text style={styles.inviteBtnText}>경쟁 도전장 보내기</Text>
            </TouchableOpacity>
            <Text style={styles.friendListHeaderText}>친구 목록</Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 30 }} />}
        showsVerticalScrollIndicator={false}
      />
      <CustomAlert
        visible={showInviteAlert}
        title="친구 초대"
        message={`${selectedFriend?.nickname}님을 초대하실래요?`}
        confirmText="네, 초대할래요."
        cancelText="아니요, 안할래요."
        onConfirm={() => {
          setShowInviteAlert(false);
          handleInvite();
        }}
        onCancel={() => {
          setShowInviteAlert(false);
          setSelectedFriend(null);
        }}
        verticalButtons={true}
      />
    </View>
  );
};

export default Invite;

const styles = StyleSheet.create({
  inviteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginTop: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
  },
  inviteBtnText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  friendListHeaderText: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
});
