/* eslint-disable no-console */
import appleAuth from '@invertase/react-native-apple-authentication';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { postAppleLogin } from '../../apis/socialLogin';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';

const AppleIcon = require('../../assets/images/login/appleIcon.png');

const AppleLogin = () => {
  const { showToast } = useToastMessageStore();
  const navigation = useNavigation();

  async function handleSignInApple() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const { user, email, fullName, identityToken } = appleAuthRequestResponse;

      const credentialState = await appleAuth.getCredentialStateForUser(user);

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const response = await postAppleLogin(identityToken, user, email, fullName);

        if (response.data.success) {
          navigation.navigate('MainTab', { screen: 'Home' });
        } else {
          throw new Error('서버 인증 실패');
        }
      } else {
        throw new Error('Apple 로그인 인증 실패');
      }
    } catch (error) {
      console.error('Apple login error:', error);
      showToast('애플 로그인에 실패했습니다.', 'error');
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={handleSignInApple}>
      <Image source={AppleIcon} style={styles.snsIcon} />
    </TouchableOpacity>
  );
};

export default AppleLogin;

const styles = StyleSheet.create({
  snsIcon: {
    width: 40,
    height: 40,
  },
});
