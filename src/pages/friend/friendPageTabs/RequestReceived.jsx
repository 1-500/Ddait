import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { acceptRequest, deleteFriend } from '../../../apis/friend';
import MemberProfileItem from '../../../components/MemberProfileItem';
import { LAYOUT_PADDING } from '../../../constants/space';
import { useToastMessageStore } from '../../../store/toastMessage/toastMessage';

const RequestReceived = ({ data, onUpdateData }) => {
  const { showToast } = useToastMessageStore();

  const handleAccept = async (tableId) => {
    try {
      await acceptRequest(tableId);
      showToast('친구 요청을 수락했어요!', 'success', 3000, 'top', 80);
      onUpdateData();
    } catch (error) {
      showToast('친구 요청 수락에 실패했어요.', 'error', 3000, 'top', 80);
    }
  };

  const handleReject = async (tableId) => {
    try {
      await deleteFriend(tableId);
      showToast('친구 요청을 거절했어요.', 'success', 3000, 'top', 80);
      onUpdateData();
    } catch (error) {
      showToast('친구 요청 거절에 실패했어요.', 'error', 3000, 'top', 80);
    }
  };

  const renderItem = ({ item }) => (
    <MemberProfileItem
      memberData={item}
      rightBtn="request"
      onAccept={() => handleAccept(item.table_id)}
      onReject={() => handleReject(item.table_id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...LAYOUT_PADDING,
  },
});

export default RequestReceived;
