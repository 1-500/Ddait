import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { acceptRequest } from '../../../apis/friend';
import MemberProfileItem from '../../../components/MemberProfileItem';
import { LAYOUT_PADDING } from '../../../constants/space';

const RequestReceived = ({ data }) => {
  // 친구 요청 수락 처리 함수
  const handleAccept = async (tableId) => {
    try {
      await acceptRequest(tableId);
    } catch (error) {
      //토스트 추가
    }
  };

  const handleReject = async () => {};

  const renderItem = ({ item }) => (
    <MemberProfileItem
      memberData={item}
      rightBtn="request"
      onAccept={() => handleAccept(item.table_id)} // 개별 아이템의 table_id 전달
      onReject={() => handleReject(item.table_id)} // 개별 아이템의 table_id 전달
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
