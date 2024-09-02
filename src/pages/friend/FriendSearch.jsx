import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { searchUser } from '../../apis/friend/index';
import CustomInput from '../../components/CustomInput';
import FriendOptionBottomSheet from '../../components/FriendOptionBottomSheet';
import MemberProfileItem from '../../components/MemberProfileItem';
import { COLORS } from '../../constants/colors';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const FriendSearch = ({ navigation }) => {
  const bottomSheetRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenOptions = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const renderItem = ({ item }) => <MemberProfileItem memberData={item} onRightBtnPress={handleOpenOptions} />;

  const handleSearch = async () => {
    try {
      const results = await searchUser(searchQuery);
      setSearchResults(results);
    } catch (error) {
      Alert.alert('검색 실패', '사용자를 검색하는 동안 문제가 발생했습니다.');
    }
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
        <SearchHeader
          navigation={navigation}
          onPressSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <View style={styles.contentContainer}>
          <FlatList
            data={searchResults} // 검색 결과를 FlatList에 전달
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

const SearchHeader = ({ navigation, onPressSearch, searchQuery, setSearchQuery }) => {
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
        value={searchQuery} // 검색어를 입력 필드에 연결
        onChangeText={setSearchQuery} // 검색어가 변경될 때 상태 업데이트
        onPressIcon={onPressSearch}
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
});
