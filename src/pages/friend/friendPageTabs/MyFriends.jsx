import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import MemberProfileItem from '../../../components/MemberProfileItem';
import { LAYOUT_PADDING } from '../../../constants/space';

const MyFriends = ({ friends, handleOpenOptions }) => {
  const renderItem = ({ item }) => <MemberProfileItem memberData={item} onRightBtnPress={handleOpenOptions} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
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
