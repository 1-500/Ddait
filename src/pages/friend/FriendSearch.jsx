import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { searchUser } from '../../apis/friend/index';
import FriendOptionBottomSheet from '../../components/BottomSheet/FriendOptionBottomSheet';
import CustomAlert from '../../components/CustomAlert';
import CustomButton from '../../components/CustomButton';
import RecommendedFriends from '../../components/friend/RecommendedFriends';
import SearchHeader from '../../components/Header/SearchHeader';
import MemberProfileItem from '../../components/MemberProfileItem';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING, SPACING } from '../../constants/space';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';

const FriendSearch = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const { showToast } = useToastMessageStore();
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [selectedMemberData, setSelectedMemberData] = useState(null);
  const [, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    onConfirm: null,
    showCancel: true,
  });

  const handleOpenOptions = useCallback((memberData) => {
    setSelectedMemberData(memberData);
    bottomSheetRef.current?.present();
  }, []);

  const renderItem = ({ item }) => (
    <MemberProfileItem memberData={item} onRightBtnPress={() => handleOpenOptions(item)} />
  );

  useEffect(() => {
    const handleSearch = async () => {
      setError('');
      setSearchResults([]);
      if (searchQuery.trim() === '') {
        return;
      }
      try {
        const res = await searchUser(searchQuery);
        if (res.data?.length === 0) {
          setSearchResults([]);
          setError(res.message);
        } else {
          setSearchResults(res.data);
          setError('');
        }
      } catch (err) {
        showToast('🚫 사용자를 검색하는 동안 문제가 발생했습니다.', 'error', 'top');
      }
    };
    handleSearch();
  }, [searchQuery, showToast]);

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <SearchHeader navigation={navigation} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <View style={styles.contentContainer}>
        {searchQuery.trim() === '' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mapSearchWrapper}>
              <Text style={styles.lgText}>따잇님</Text>
              <Text style={styles.mdText}>주변에 있는 따잇러도 찾아보시지 않으실래요?</Text>
              <CustomButton style={styles.btnLayout} theme="primary" size="medium" text="지도에서 따잇러 찾기" />
            </View>
            <RecommendedFriends onOpenOptions={handleOpenOptions} />
          </ScrollView>
        ) : (
          <>
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.errorContainer}>
                <Text style={[styles.mdText, { textAlign: 'center' }]}>{error}</Text>
              </View>
            )}
          </>
        )}
      </View>
      <FriendOptionBottomSheet
        ref={bottomSheetRef}
        relation="none"
        memberData={selectedMemberData}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  contentContainer: {
    ...LAYOUT_PADDING,
    flex: 1,
  },
  mapSearchWrapper: {
    flex: 1,
    gap: SPACING.md,
    ...ELEMENT_VERTICAL_MARGIN,
  },
  btnLayout: {
    alignSelf: 'flex-end',
  },
  mdText: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[600],
  },
  lgText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.PRETENDARD[700],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendSearch;
