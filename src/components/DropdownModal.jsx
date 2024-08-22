import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

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
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBtnSelected: {
    backgroundColor: '#5D5DFC',
  },
  dropdownText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 17,
  },
  dropdownMenu: {
    position: 'absolute',
    paddingVertical: 8,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#5D5DFC',
    borderRadius: 12,
  },
  dropdownWrapper: {
    width: '100%',
    alignItems: 'center',
    gap: 5,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#5D5DFC',
  },
  optionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: '100%',
  },
  optionBtnSelected: {
    backgroundColor: 'rgba(93, 93, 252, 0.20)',
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FDA758',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default DropdownModal;
