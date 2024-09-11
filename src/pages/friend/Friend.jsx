import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import { getMyFriends, getReqReceived, getReqSent } from '../../apis/friend';
import FriendOptionBottomSheet from '../../components/BottomSheet/FriendOptionBottomSheet';
import CustomAlert from '../../components/CustomAlert';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';
import MyFriends from './friendPageTabs/MyFriends';
import RequestReceived from './friendPageTabs/RequestReceived';
import RequestSent from './friendPageTabs/RequestSent';

const Friend = ({ navigation }) => {
  const isFocused = useIsFocused();
  const route = useRoute();
  const initialIndex = route.params?.initialIndex;
  const [myFriends, setMyFriends] = useState([]);
  const [reqSent, setReqSent] = useState([]);
  const [reqReceived, setReqReceived] = useState([]);
  const [selectedMemberData, setSelectedMemberData] = useState([]);
  const [selectedRelation, setSelectedRelation] = useState(null);
  const bottomSheetRef = useRef(null);
  const { showToast } = useToastMessageStore();
  const [alertVisible, setAlertVisible] = useState(false); // Alert 표시 여부
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    onConfirm: null,
    showCancel: true,
  });
  const [index, setIndex] = useState(initialIndex || 0);
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
        return <RequestReceived data={reqReceived} onUpdateData={fetchData} />;
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

  const fetchData = useCallback(async () => {
    try {
      const friends = await getMyFriends();
      setMyFriends(friends.data);
      const sentRequests = await getReqSent();
      setReqSent(sentRequests.data);
      const receivedRequests = await getReqReceived();
      setReqReceived(receivedRequests.data);
    } catch (error) {
      showToast('🚫 문제 발생! 다시 시도해주세요.', 'error', 'top');
    }
  }, [showToast]);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [fetchData, isFocused]);

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };
  return (
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
      <FriendOptionBottomSheet
        ref={bottomSheetRef}
        relation={selectedRelation}
        memberData={selectedMemberData}
        onUpdateData={fetchData}
        setAlertVisible={setAlertVisible}
        setAlertConfig={setAlertConfig}
      />
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={alertConfig.onConfirm}
        onCancel={hideAlert}
        showCancel={alertConfig.showCancel}
      />
    </SafeAreaView>
  );
};

export default Friend;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
});
