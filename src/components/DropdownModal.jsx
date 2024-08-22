import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../constants/font';
import { RADIUS } from '../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../constants/space';

const DropdownModal = ({ options = [], onChange = () => {}, value, placeholder }) => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [hoveredOption, setHoveredOption] = useState(null);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const buttonRef = useRef(null);

  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({ top: pageY + height + 8, left: pageX });
      });
    }
  }, [showDropdown]);

  const selectOption = (option) => {
    onChange(option);
    closeDropdown();
  };

  const animateDropdown = (toValue, callback) => {
    Animated.timing(dropdownAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(callback);
  };

  const toggleDropdown = () => {
    if (showDropdown) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    setShowDropDown(true);
    animateDropdown(1);
  };

  const closeDropdown = () => {
    animateDropdown(0, () => setShowDropDown(false));
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        ref={buttonRef}
        onPress={toggleDropdown}
        style={[styles.dropdownBtn, showDropdown && styles.dropdownBtnSelected]}
      >
        <Text style={styles.dropdownText}>{value || placeholder}</Text>
      </TouchableOpacity>

      <Modal transparent visible={showDropdown} animationType="none">
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.dropdownMenu,
                {
                  opacity: dropdownAnimation,
                  maxHeight: dropdownAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 300],
                  }),
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                },
              ]}
            >
              <TouchableWithoutFeedback>
                <View style={styles.dropdownWrapper}>
                  {options.map((option, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <View style={styles.divider} />}
                      <TouchableOpacity
                        onPress={() => selectOption(option)}
                        onPressIn={() => setHoveredOption(option)}
                        onPressOut={() => setHoveredOption(null)}
                        style={[styles.optionBtn, hoveredOption === option && styles.optionBtnSelected]}
                      >
                        <Text style={[styles.optionText, value === option && styles.selectedOptionText]}>{option}</Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownBtn: {
    ...LAYOUT_PADDING,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.darkGrey,
    borderRadius: RADIUS.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBtnSelected: {
    backgroundColor: COLORS.primary,
  },
  dropdownText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.md,
    lineHeight: 17,
  },
  dropdownMenu: {
    position: 'absolute',
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.darkGrey,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.large,
  },
  dropdownWrapper: {
    width: '100%',
    alignItems: 'center',
    gap: SPACING.xxs,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.primary,
  },
  optionBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    width: '100%',
  },
  optionBtnSelected: {
    backgroundColor: 'rgba(93, 93, 252, 0.8)',
  },
  optionText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
  },
  selectedOptionText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default DropdownModal;
