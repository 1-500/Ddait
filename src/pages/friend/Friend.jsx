import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import { getMyFriends } from '../../apis/friend';
import FriendOptionBottomSheet from '../../components/FriendOptionBottomSheet';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import MyFriends from './friendPageTabs/MyFriends';
import ReceivedRequests from './friendPageTabs/ReceivedRequests';
import SentRequests from './friendPageTabs/SentRequests';

const Friend = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'myFriends', title: '내 친구' },
    { key: 'receivedRequests', title: '받은 신청' },
    { key: 'sentRequests', title: '보낸 신청' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'myFriends':
        return <MyFriends friends={friends} handleOpenOptions={handleOpenOptions} />;
      case 'receivedRequests':
        return <ReceivedRequests handleOpenOptions={handleOpenOptions} />;
      case 'sentRequests':
        return <SentRequests handleOpenOptions={handleOpenOptions} />;
      default:
        return null;
    }
  };

  const handleOpenOptions = useCallback((memberId) => {
    setSelectedMemberId(memberId);
    bottomSheetRef.current?.present();
  }, []);

  const fetchMyFriends = async () => {
    try {
      const { data } = await getMyFriends();
      setFriends(data);
    } catch (error) {
      Alert.alert('Error fetching friends:', error.message);
    }
  };

  useEffect(() => {
    fetchMyFriends();
  }, []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.safeArea}>
        <HeaderComponents icon="search" title="친구 목록" onRightBtnPress={() => navigation.navigate('FriendSearch')} />
        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              activeColor={COLORS.white}
              inactiveColor={COLORS.lightGrey}
              labelStyle={{ fontSize: FONT_SIZES.md, fontFamily: FONTS.PRETENDARD[600] }}
              indicatorStyle={{ backgroundColor: COLORS.primary }}
              style={{ backgroundColor: COLORS.darkBackground }}
            />
          )}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
        <FriendOptionBottomSheet ref={bottomSheetRef} isFriend={true} memberId={selectedMemberId} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Friend;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
});
