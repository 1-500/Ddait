import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import MemberProfileItem from '../../../components/MemberProfileItem';
import { LAYOUT_PADDING } from '../../../constants/space';

const MyFriends = ({ data, handleOpenOptions }) => {
  const renderItem = ({ item }) => (
    <MemberProfileItem memberData={item} onRightBtnPress={() => handleOpenOptions(item, 'friend')} />
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

export default MyFriends;
