import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import { getMyFriends, getReqReceived, getReqSent } from '../../apis/friend';
import FriendOptionBottomSheet from '../../components/FriendOptionBottomSheet';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import MyFriends from './friendPageTabs/MyFriends';
import RequestReceived from './friendPageTabs/RequestReceived';
import RequestSent from './friendPageTabs/RequestSent';

const Friend = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [myFriends, setMyFriends] = useState([]);
  const [reqSent, setReqSent] = useState([]);
  const [reqReceived, setReqReceived] = useState([]);
  const [selectedMemberData, setSelectedMemberData] = useState([]);
  const [selectedRelation, setSelectedRelation] = useState(null);
  const bottomSheetRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'myFriends', title: '내 친구' },
    { key: 'reqReceived', title: '받은 신청' },
    { key: 'reqSent', title: '보낸 신청' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'myFriends':
        return <MyFriends data={myFriends} handleOpenOptions={handleOpenOptions} />;
      case 'reqReceived':
        return <RequestReceived data={reqReceived} onUpdateData={fetchMyFriends} />;
      case 'reqSent':
        return <RequestSent data={reqSent} handleOpenOptions={handleOpenOptions} />;
      default:
        return null;
    }
  };

  const handleOpenOptions = useCallback((memberData, relation) => {
    setSelectedMemberData(memberData);
    setSelectedRelation(relation);
    bottomSheetRef.current?.present();
  }, []);

  const fetchMyFriends = async () => {
    try {
      const myFriendsRes = await getMyFriends();
      setMyFriends(myFriendsRes.data);

      const reqSentRes = await getReqSent();
      setReqSent(reqSentRes.data);

      const reqReceivedRes = await getReqReceived();
      setReqReceived(reqReceivedRes.data);
    } catch (error) {
      Alert.alert('Error fetching friends:', error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchMyFriends();
    }
  }, [isFocused]);

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
        <FriendOptionBottomSheet ref={bottomSheetRef} relation={selectedRelation} memberData={selectedMemberData} />
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
