import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { getMyFriends } from '../../apis/friend';
import FriendOptionBottomSheet from '../../components/FriendOptionBottomSheet';
import HeaderComponents from '../../components/HeaderComponents';
import MemberProfileItem from '../../components/MemberProfileItem';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const Friend = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const handleOpenOptions = useCallback((memberId) => {
    setSelectedMemberId(memberId);
    bottomSheetRef.current?.present();
  }, []);
  const renderItem = ({ item }) => <MemberProfileItem memberData={item} onRightBtnPress={handleOpenOptions} />;

  const [friends, setFriends] = useState();

  const fetchMyCompetitions = async () => {
    try {
      const { data } = await getMyFriends();
      setFriends(data);
    } catch (error) {
      Alert.alert('Error fetching competitions:', error.message);
    }
  };

  useEffect(() => {
    fetchMyCompetitions();
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
        <HeaderComponents icon="search" title="친구 목록" onRightBtnPress={() => navigation.navigate('FriendSearch')} />
        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>내 친구</Text>
          <FlatList
            data={friends}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160 }}
          />
        </View>
        <FriendOptionBottomSheet ref={bottomSheetRef} isFriend={true} memberId={selectedMemberId} />
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
