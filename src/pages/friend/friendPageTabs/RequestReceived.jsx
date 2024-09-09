import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { acceptRequest } from '../../../apis/friend';
import MemberProfileItem from '../../../components/MemberProfileItem';
import { LAYOUT_PADDING } from '../../../constants/space';

const RequestReceived = ({ data, onUpdateData }) => {
  const handleAccept = async (tableId) => {
    try {
      await acceptRequest(tableId);
      onUpdateData();
    } catch (error) {
      //토스트 추가
    }
  };

  const handleReject = async (tableId) => {
    try {
      // 거절 API 호출
      onUpdateData();
    } catch (error) {
      // 토스트 추가
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
