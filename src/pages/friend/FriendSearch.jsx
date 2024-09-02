import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { dummyFriends } from '../../apis/dummydata';
import CustomInput from '../../components/CustomInput';
import FriendOptionBottomSheet from '../../components/FriendOptionBottomSheet';
import MemberProfileItem from '../../components/MemberProfileItem';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const FriendSearch = ({ navigation }) => {
  const bottomSheetRef = useRef(null);

  const handleOpenOptions = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const renderItem = ({ item }) => <MemberProfileItem memberData={item} onRightBtnPress={handleOpenOptions} />;

  const handleSearch = () => {
    return Alert.alert('검색 버튼 클릭');
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
        <SearchHeader navigation={navigation} onPressSearch={handleSearch} />
        <View style={styles.contentContainer}>
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

const SearchHeader = ({ navigation, onPressSearch }) => {
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
      <CustomInput size="stretch" theme="search" onPressIcon={onPressSearch} />
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
