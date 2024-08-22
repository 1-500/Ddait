import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { COLORS } from '../constants/colors';
import { FONT_WEIGHTS, HEADER_FONT_SIZES } from '../constants/font';
import { SPACING } from '../constants/space';

/**
 *
 * @param {{
 * icon: 'none' | 'btn' | 'search' | 'setting' | 'timer' | 'scrap_on' | 'scrap_off' | 'menu' | 'date';
 * title: string
 * onRightBtnPress: () => void;
 * onDatePress: () => void;
 * }} param0
 */

const HeaderComponents = ({ icon = 'none', title = '', onRightBtnPress = () => {}, onDatePress = () => {} }) => {
  const navigation = useNavigation();

  const getRightBtn = () => {
    switch (icon) {
      case 'btn':
        return (
          <TouchableOpacity style={styles.btnWrapper} onPress={onRightBtnPress} activeOpacity={0.6}>
            <Text style={styles.submitBtnTitle}>저장</Text>
          </TouchableOpacity>
        );
      case 'search':
        return (
          <TouchableOpacity style={styles.btnWrapper} onPress={onRightBtnPress} activeOpacity={0.6}>
            <Ionicons name="search-sharp" size={24} color={COLORS.white} />
          </TouchableOpacity>
        );
      case 'setting':
        return (
          <TouchableOpacity style={styles.btnWrapper} onPress={onRightBtnPress} activeOpacity={0.6}>
            <SimpleLineIcons name="settings" size={24} color={COLORS.white} />
          </TouchableOpacity>
        );
      case 'timer':
        return (
          <TouchableOpacity style={styles.btnWrapper} onPress={onRightBtnPress} activeOpacity={0.6}>
            <MaterialCommunityIcons name="timer-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        );
      case 'scrap_on':
        return (
          <TouchableOpacity style={styles.btnWrapper} onPress={onRightBtnPress} activeOpacity={0.6}>
            <MaterialCommunityIcons name="bookmark" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        );
      case 'scrap_off':
        return (
          <TouchableOpacity style={styles.btnWrapper} onPress={onRightBtnPress} activeOpacity={0.6}>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        );
      case 'menu':
        return (
          <TouchableOpacity style={styles.btnWrapper} onPress={onRightBtnPress} activeOpacity={0.6}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color={COLORS.white} />
          </TouchableOpacity>
        );
      default:
        return <View style={styles.btnWrapper} />;
    }
  };

  return (
    <View>
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
        {icon !== 'date' ? (
          <Text style={styles.titleText}>{title}</Text>
        ) : (
          <TouchableOpacity style={styles.dateWrapper} onPress={onDatePress} activeOpacity={0.6}>
            <Text style={styles.titleText}>{title}</Text>
            <FontAwesome name="angle-down" size={24} color={COLORS.white} />
          </TouchableOpacity>
        )}
        {getRightBtn()}
      </View>
    </View>
  );
};

export default HeaderComponents;

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
  titleText: {
    fontSize: HEADER_FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: 44,
    color: COLORS.white,
  },
  submitBtnTitle: {
    fontSize: 16,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.primary,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
});
