import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { dummyFriends } from '../../apis/dummydata';
import { searchUser } from '../../apis/friend/index';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import FriendOptionBottomSheet from '../../components/FriendOptionBottomSheet';
import MemberProfileItem from '../../components/MemberProfileItem';
import SectionTitle from '../../components/SectionTitle';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { ELEMENT_VERTICAL_MARGIN, LAYOUT_PADDING, SPACING } from '../../constants/space';

const FriendSearch = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

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
  }, [searchQuery]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.safeArea}>
        <SearchHeader navigation={navigation} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <View style={styles.contentContainer}>
          {searchQuery.trim() === '' ? (
            //검색어가 없을 때
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.mapSearchWrapper}>
                <Text style={styles.lgText}>따잇님</Text>
                <Text style={styles.mdText}>주변에 있는 따잇러도 찾아보시지 않으실래요?</Text>
                <CustomButton style={styles.btnLayout} theme="primary" size="medium" text="지도에서 따잇러 찾기" />
              </View>
              {/* <SectionTitle title="카카오톡 친구" showMore={true} navigation={navigation} /> 추후구현 */}
              <SectionTitle title="추천 친구" />
              <View>
                {dummyFriends.map((friend) => (
                  <MemberProfileItem key={friend.id} memberData={friend} onRightBtnPress={handleOpenOptions} />
                ))}
              </View>
            </ScrollView>
          ) : (
            <>
              {searchResults.length > 0 ? (
                //검색 결과
                <FlatList
                  data={searchResults}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                //검색 결과가 없을 때
                <View style={styles.errorContainer}>
                  <Text style={[styles.mdText, { textAlign: 'center' }]}>{error}</Text>
                </View>
              )}
            </>
          )}
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
        returnKeyType="search"
      />
    </View>
  );
};

export default FriendSearch;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  contentContainer: {
    ...LAYOUT_PADDING,
    flex: 1,
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
