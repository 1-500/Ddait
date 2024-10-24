import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONTS } from '../constants/font';
import { SPACING } from '../constants/space';
import Toggle from './Toggle';

const { width } = Dimensions.get('window');

const SettingItem = ({ title, description, leftBtn, rightBtn, onPress, onToggle, isToggled, isRadioActive }) => {
  const renderLeftBtn = () => {
    if (leftBtn === 'radio') {
      return (
        <Fontisto name={isRadioActive ? 'radio-btn-active' : 'radio-btn-passive'} size={20} color={COLORS.primary} />
      );
    }
  };

  const renderRightBtn = () => {
    switch (rightBtn) {
      case 'arrow':
        return <FontAwesome name="angle-right" size={24} color={COLORS.white} />;
      case 'toggle':
        return <Toggle isOn={isToggled} onToggle={onToggle} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {renderLeftBtn()}
          <View style={{ gap: 12 }}>
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
          </View>
        </View>
        {renderRightBtn()}
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: COLORS.darkGrey,
    padding: SPACING.lg,
  },
  title: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
    maxWidth: width - 76,
  },
  description: {
    color: COLORS.white,
    fontFamily: FONTS.PRETENDARD[300],
    maxWidth: width - 76,
  },
});
