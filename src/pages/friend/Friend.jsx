import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { dummyFriends } from '../../apis/dummydata';
import FriendOptionBottomSheet from '../../components/FriendOptionBottomSheet';
import HeaderComponents from '../../components/HeaderComponents';
import MemberProfileItem from '../../components/MemberProfileItem';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const Friend = () => {
  const bottomSheetRef = useRef(null);

  const handleOpenOptions = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const renderItem = ({ item }) => <MemberProfileItem memberData={item} onRightBtnPress={handleOpenOptions} />;

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
        <HeaderComponents icon="search" title="친구 목록" />
        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>내 친구</Text>
          <FlatList
            data={dummyFriends}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160 }}
          />
        </View>
        <FriendOptionBottomSheet ref={bottomSheetRef} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Friend;

const styles = StyleSheet.create({
  contentContainer: {
    ...LAYOUT_PADDING,
    paddingTop: SPACING.md,
    gap: SPACING.xs,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.PRETENDARD[600],
  },
});
