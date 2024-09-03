import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { searchUser } from '../../apis/friend/index';
import CustomInput from '../../components/CustomInput';
import FriendOptionBottomSheet from '../../components/FriendOptionBottomSheet';
import MemberProfileItem from '../../components/MemberProfileItem';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const FriendSearch = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(''); // 에러 메시지 상태로 변경

  const handleOpenOptions = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const renderItem = ({ item }) => <MemberProfileItem memberData={item} onRightBtnPress={handleOpenOptions} />;

  const handleSearch = useCallback(async () => {
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
        setSearchResults(res);
        setError('');
      }
    } catch (error) {
      Alert.alert('검색 실패', '사용자를 검색하는 동안 문제가 발생했습니다.');
    }
  }, [searchQuery]); // 검색어가 변경될 때마다

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
        <SearchHeader navigation={navigation} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <View style={styles.contentContainer}>
          <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 160 }}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
        <FriendOptionBottomSheet ref={bottomSheetRef} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const SearchHeader = ({ navigation, searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.btnWrapper}
        activeOpacity={0.6}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      >
        <FontAwesome name="angle-left" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <CustomInput
        size="stretch"
        theme="search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search" // 키보드 엔터 키 '검색'
      />
    </View>
  );
};

export default FriendSearch;

const styles = StyleSheet.create({
  contentContainer: {
    ...LAYOUT_PADDING,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    backgroundColor: COLORS.darkBackground,
  },
  btnWrapper: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.PRETENDARD[600],
  },
});
