import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CustomInput from '../../components/CustomInput';
import { COLORS } from '../../constants/colors';
import { SPACING } from '../../constants/space';

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
export default SearchHeader;

const styles = StyleSheet.create({
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
