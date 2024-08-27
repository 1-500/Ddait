import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MemberProfileItem from '../../../components/MemberProfileItem';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../../constants/space';

const Invite = ({ friends }) => {
  return (
    <View style={[{ flex: 1 }, LAYOUT_PADDING]}>
      <FlatList
        data={friends}
        keyExtractor={(item, index) => index} // 나중에 member table id로 변경하기
        renderItem={({ item }) => <MemberProfileItem memberData={item} rightBtn="invite" />}
        ListHeaderComponent={
          <View>
            <TouchableOpacity style={styles.inviteBtn} activeOpacity={0.6}>
              <Text style={styles.inviteBtnText}>경쟁 도전장 보내기</Text>
            </TouchableOpacity>
            <Text style={styles.friendListHeaderText}>친구 목록</Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 30 }} />}
        showsVerticalScrollIndicator={false}
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
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  friendListHeaderText: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
});
