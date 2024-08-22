import React from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import { COLORS, INPUT_COLORS, TEXT_COLORS } from '../constants/colors';
import { RADIUS } from '../constants/radius';

const XIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M17.3037 5.9893L5.99001 17.303L6.69711 18.0101L18.0108 6.69641L17.3037 5.9893Z" fill="#3A3A3A" />
    <Path d="M6.69711 5.98985L5.99001 6.69696L17.3037 18.0107L18.0108 17.3036L6.69711 5.98985Z" fill="#3A3A3A" />
  </Svg>
);

const OnEye = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M12.025 8.5C15.125 8.5 17.925 11.3 19.025 12.5C17.925 13.7 15.125 16.5 12.025 16.5C8.925 16.5 6.125 13.7 5.025 12.5C6.125 11.3 8.925 8.5 12.025 8.5ZM12.025 7.5C8.525 7.5 5.425 10.5 4.225 11.8C3.925 12.2 3.925 12.7 4.225 13.1C5.425 14.5 8.425 17.4 12.025 17.4C15.625 17.4 18.625 14.4 19.825 13.1C20.125 12.7 20.125 12.2 19.825 11.8C18.625 10.5 15.525 7.5 12.025 7.5Z"
      fill="#3A3A3A"
    />
    <Path
      d="M13.5249 12.5C12.7249 12.5 12.0249 11.8 12.0249 11C12.0249 10.4 12.4249 9.9 12.9249 9.6C12.6249 9.6 12.3249 9.5 12.0249 9.5C10.3249 9.5 9.0249 10.8 9.0249 12.5C9.0249 14.2 10.3249 15.5 12.0249 15.5C13.7249 15.5 15.0249 14.2 15.0249 12.5C15.0249 12.2 14.9249 11.9 14.9249 11.6C14.6249 12.1 14.1249 12.5 13.5249 12.5Z"
      fill="#3A3A3A"
    />
    <Path
      d="M12.0249 8C11.7249 8 11.5249 7.8 11.5249 7.5V6.5C11.5249 6.2 11.7249 6 12.0249 6C12.3249 6 12.5249 6.2 12.5249 6.5V7.5C12.5249 7.8 12.3249 8 12.0249 8Z"
      fill="#3A3A3A"
    />
    <Path
      d="M9.0251 8.99999C8.9251 8.99999 8.7251 8.99999 8.6251 8.89999L7.6251 7.89999C7.4251 7.69999 7.4251 7.39999 7.6251 7.19999C7.8251 6.99999 8.1251 6.99999 8.3251 7.19999L9.3251 8.19999C9.5251 8.39999 9.5251 8.69999 9.3251 8.89999C9.3251 8.99999 9.1251 8.99999 9.0251 8.99999Z"
      fill="#3A3A3A"
    />
    <Path
      d="M15.0251 8.99999C14.9251 8.99999 14.7251 8.99999 14.6251 8.89999C14.4251 8.69999 14.4251 8.39999 14.6251 8.19999L15.6251 7.19999C15.8251 6.99999 16.1251 6.99999 16.3251 7.19999C16.5251 7.39999 16.5251 7.69999 16.3251 7.89999L15.3251 8.89999C15.3251 8.99999 15.1251 8.99999 15.0251 8.99999Z"
      fill="#3A3A3A"
    />
  </Svg>
);

const OffEye = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#clip0_616:9575)">
      <Path
        d="M12.0001 7.4C15.1001 7.4 17.9001 10.2 19.0001 11.4C17.9001 12.6 15.1001 15.4 12.0001 15.4C8.9001 15.4 6.1001 12.6 5.0001 11.4C6.1001 10.1 8.9001 7.4 12.0001 7.4ZM12.0001 6.4C8.5001 6.4 5.4001 9.4 4.2001 10.7C3.9001 11.1 3.9001 11.6 4.2001 12C5.4001 13.4 8.4001 16.3 12.0001 16.3C15.6001 16.3 18.6001 13.3 19.8001 12C20.1001 11.6 20.1001 11.1 19.8001 10.7C18.6001 9.3 15.5001 6.4 12.0001 6.4Z"
        fill="#C3C3C3"
      />
      <Path
        d="M13.5 11.4C12.7 11.4 12 10.7 12 9.9C12 9.3 12.4 8.8 12.9 8.5C12.6 8.4 12.3 8.4 12 8.4C10.3 8.4 9 9.7 9 11.4C9 13.1 10.3 14.4 12 14.4C13.7 14.4 15 13.1 15 11.4C15 11.1 14.9 10.8 14.9 10.5C14.6 11 14.1 11.4 13.5 11.4Z"
        fill="#C3C3C3"
      />
      <Path d="M18.6793 4.0325L4.67871 18.0331L5.38581 18.7402L19.3864 4.7396L18.6793 4.0325Z" fill="#C3C3C3" />
    </G>
    <Defs>
      <ClipPath id="clip0_616:9575">
        <Rect width="16" height="14.7" fill="white" transform="translate(4 4)" />
      </ClipPath>
    </Defs>
  </Svg>
);

const SearchIcon = () => (
  <Svg
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    width="20px"
    height="20px"
    viewBox="0 0 122.879 119.799"
    enable-background="new 0 0 122.879 119.799"
  >
    <G>
      <Path
        d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z"
        fill={'#3A3A3A'}
      />
    </G>
  </Svg>
);

/**
 *
 * @param {{
 * size: 'large' | 'medium' | 'small';
 * theme: 'primary' | 'search' | 'user' | 'success' | 'error';
 * isSuccess: boolean;
 * onPressShowPassword?: () => {};
 * autoFocus: boolean;
 * ref?: React.LegacyRef<null>;
 * isPassword: boolean;
 * placeholder: string;
 * value: string;
 * isError?: boolean;
 * secureTextEntry?: boolean;
 * onChangeText: (text: string) => void;
 * keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'name-phone-pad' | 'twitter' | 'web-search';
 * textContentType: 'none' | 'URL' | 'addressCity' | 'addressCityAndState' | 'addressState' | 'countryName' | 'creditCardNumber' | 'emailAddress' | 'familyName' | 'fullStreetAddress' | 'givenName' | 'jobTitle' | 'location' | 'middleName' | 'name' | 'namePrefix' | 'nameSuffix' | 'nickname' | 'organizationName' | 'postalCode' | 'streetAddressLine1' | 'streetAddressLine2' | 'sublocality' | 'telephoneNumber' | 'username' | 'password' | 'newPassword' | 'oneTimeCode'
 * }} param0
 *
 */

const CustomInput = ({
  size,
  theme,
  ref,
  placeholder,
  keyboardType = 'default',
  textContentType = 'none',
  isError = false,
  isSuccess = false,
  value,
  onChangeText,
  autoFocus = false,
  secureTextEntry = false,
  isPassword = false,
  onPressShowPassword = () => {},
}) => {
  const windowWidth = Dimensions.get('window').width;

  const dynamicStyles = StyleSheet.create({
    size_small: {
      width: windowWidth / 5,
      height: 40,
    },
    inputContainer: {
      flex: 1,
      minWidth: windowWidth / 5,
    },
  });

  return (
    <View
      style={[
        styles.container,
        size === 'small' ? dynamicStyles.size_small : styles[`size_${size}`],
        theme === 'user'
          ? isError
            ? styles.errorUserInputBox
            : styles.userInputBox
          : theme === 'primary' || theme === 'search'
            ? styles.primaryInputBox
            : isError
              ? styles.errorInputBox
              : isSuccess
                ? styles.successInputBox
                : styles.defaultInputBox,
      ]}
    >
      <TextInput
        ref={ref}
        style={[styles.input, theme === 'search' && styles.inputWithIcon]}
        placeholder={placeholder}
        placeholderTextColor={`${COLORS.placeholder}`}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        allowFontScaling={false}
        textContentType={textContentType}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      {theme === 'search' && (
        <View style={styles.iconWrapper}>
          <SearchIcon />
        </View>
      )}
      {isPassword && theme !== 'search' ? (
        <TouchableOpacity activeOpacity={0.5} onPress={onPressShowPassword}>
          {secureTextEntry ? <OnEye /> : <OffEye />}
        </TouchableOpacity>
      ) : (
        value.length > 0 &&
        !isPassword &&
        size !== 'small' && (
          <TouchableOpacity activeOpacity={0.5} onPress={() => onChangeText('')}>
            <XIcon />
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: RADIUS.small,
    paddingHorizontal: 8,
    height: 46,
  },
  primaryInputBox: {
    borderWidth: 1,
    borderColor: INPUT_COLORS.primary,
  },
  themes_search: {
    borderColor: INPUT_COLORS.primary,
  },
  userInputBox: {
    borderBottomWidth: 1,
    borderBottomColor: INPUT_COLORS.primary,
  },
  errorUserInputBox: {
    borderBottomWidth: 1,
    borderBottomColor: INPUT_COLORS.error,
  },
  themes_success: {
    borderColor: INPUT_COLORS.success,
  },
  themes_error: {
    borderColor: INPUT_COLORS.error,
  },
  size_large: {
    width: '100%',
  },
  size_medium: {
    width: '50%',
  },
  input: {
    flex: 1,
    color: TEXT_COLORS.primary,
    fontSize: 14,
    height: '100%',
    width: 'auto',
    marginRight: 16,
  },
  inputWithIcon: {
    marginRight: 40,
  },
  iconWrapper: {
    position: 'absolute',
    right: 10,
  },
  defaultInputBox: {
    borderStyle: 'solid',
    borderColor: INPUT_COLORS.block,
    borderWidth: 1,
  },
  successInputBox: {
    borderStyle: 'solid',
    borderColor: INPUT_COLORS.success,
    borderWidth: 0.5,
  },
  errorInputBox: {
    borderStyle: 'solid',
    borderColor: INPUT_COLORS.error,
    borderWidth: 0.5,
  },
});

export default React.memo(CustomInput);
