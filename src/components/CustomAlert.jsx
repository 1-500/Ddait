import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { FONT_SIZES, FONTS } from '../constants/font';
import { SPACING } from '../constants/space';

const CustomAlert = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  showCancel = true,
  confirmText = '확인',
  cancelText = '취소',
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={[styles.buttonContainer, !showCancel && styles.singleButtonContainer]}>
            {showCancel && (
              <>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                  <Text style={[styles.buttonText, styles.cancelText]}>{cancelText}</Text>
                </TouchableOpacity>
                <View style={styles.verticalSeparator} />
              </>
            )}
            <TouchableOpacity style={[styles.button, !showCancel && styles.singleButton]} onPress={onConfirm}>
              <Text style={[styles.buttonText, showCancel ? styles.confirmText : styles.singleButtonText]}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: COLORS.darkGreyBackground,
    borderRadius: SPACING.md,
    width: '80%',
    overflow: 'hidden',
  },
  contentContainer: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  message: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    textAlign: 'center',
    lineHeight: FONT_SIZES.sm * 1.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.darkBackground,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalSeparator: {
    width: 1,
    backgroundColor: COLORS.darkBackground,
  },
  buttonText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
  },
  cancelText: {
    color: COLORS.primary,
  },
  confirmText: {
    color: COLORS.red,
  },
  singleButtonContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.darkBackground,
  },
  singleButton: {
    borderTopWidth: 0,
  },
  singleButtonText: {
    color: COLORS.primary,
  },
});

export default CustomAlert;
