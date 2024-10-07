import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import { updateProfile } from '../../apis/mypage';
import CustomAlert from '../../components/CustomAlert';
import CustomButton from '../../components/CustomButton';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { RADIUS } from '../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';
import useUserStore from '../../store/sign/login';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';
import SetSportsCategory from '../competition/CompetitionCreation/SetSportsCategory';

const defaultProfile = require('../../assets/images/default-profile.png');

const ProfileEdit = ({ navigation }) => {
  const { nickname, introduce, profileImageUrl, setUserInfo } = useUserStore((state) => ({
    nickname: state.nickname,
    introduce: state.introduce,
    profileImageUrl: state.profileImageUrl,
    setUserInfo: state.setUserInfo,
  }));
  const [newNickname, setNewNickname] = useState(nickname || '');
  const [newIntroduce, setNewIntroduce] = useState(introduce || '');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const { showToast } = useToastMessageStore();
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    onConfirm: null,
    showCancel: true,
  });

  const showAlert = (config) => {
    setAlertConfig({ ...config, visible: true });
  };

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const handleImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      compressImageQuality: 0.7,
    })
      .then((image) => {
        setNewProfileImage(image.path);
      })
      .catch((error) => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          showToast('잠시 후 다시 시도해주세요.', 'error', 2000, 'top');
        }
      });
  };

  const handleImagePress = () => {
    setShowImageOverlay(!showImageOverlay);
  };

  const handleOutsidePress = () => {
    if (showImageOverlay) {
      setShowImageOverlay(false);
    }
  };

  const handleImageDelete = async () => {
    try {
      setNewProfileImage(null);
      setShowImageOverlay(false);

      const result = await updateProfile({ profileImage: null });
      setUserInfo({
        ...useUserStore.getState(),
        profileImageUrl: null,
      });
    } catch (error) {
      showToast('잠시 후 다시 시도해주세요.', 'error', 2000, 'top');
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = {};
      if (newNickname !== nickname) {
        updatedData.nickname = newNickname;
      }
      if (newIntroduce !== introduce) {
        updatedData.introduce = newIntroduce;
      }
      if (newProfileImage !== null) {
        updatedData.profileImage = newProfileImage;
      }

      if (Object.keys(updatedData).length === 0) {
        showToast('💥 변경된 정보가 없습니다!', 'error', 2000, 'top');
        return;
      }

      const result = await updateProfile(updatedData);
      setUserInfo({
        nickname: result.data.nickname,
        introduce: result.data.introduce,
        profileImageUrl: result.data.profile_image || profileImageUrl,
      });

      showToast('프로필이 업데이트 되었습니다! 😋', 'success', 2000, 'top');
      navigation.goBack();
    } catch (error) {
      showToast(error.message || '잠시 후 다시 시도해주세요', 'error', 2000, 'top');
    }
  };

  const handleDeleteAccount = () => {
    showAlert({
      title: '잠깐! 🚨',
      message: '탈퇴 시 모든 기록이 삭제됩니다.\n이 작업은 되돌릴 수 없습니다!\n\n정말로 탈퇴를 진행하시겠습니까?',
      onConfirm: async () => {
        try {
          // 회원 탈퇴 api
          hideAlert();
          showToast('💥 회원 탈퇴가 완료되었습니다.', 'success', 2000, 'top');
          // navigation.navigate('Login');
        } catch (error) {
          showToast('잠시 후 다시 시도해주세요.', 'error', 2000, 'top');
        }
      },
      onCancel: hideAlert,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponents title="회원 정보 수정" icon="save" onRightBtnPress={handleSave} />
        <ScrollView style={styles.container}>
          <View style={styles.profileImgWrapper}>
            <TouchableOpacity onPress={handleImagePress} activeOpacity={0.9}>
              <Image
                source={
                  newProfileImage
                    ? { uri: newProfileImage }
                    : profileImageUrl
                      ? { uri: profileImageUrl }
                      : defaultProfile
                }
                style={styles.profileImg}
              />
              {showImageOverlay && (
                <TouchableOpacity style={styles.overlay} onPress={handleImageDelete}>
                  <Text style={styles.overlayText}>삭제</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <CustomButton theme="primary" size="xs" text="이미지 선택" onPress={handleImageUpload} />
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>닉네임</Text>
            <TextInput
              style={styles.input}
              placeholder="어떻게 불리고 싶으신가요?"
              placeholderTextColor={'#7676AC'}
              value={newNickname}
              onChangeText={setNewNickname}
            />
          </View>
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>소개</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder={'어떤 운동을 좋아하시나요?\n자유롭게 본인을 소개해보세요!'}
              placeholderTextColor={'#7676AC'}
              multiline={true}
              numberOfLines={2}
              textAlignVertical="top"
              value={newIntroduce}
              onChangeText={setNewIntroduce}
            />
          </View>

          {/* 선호 운동 */}
          <View style={[styles.sectionWrapper, { gap: SPACING.sm }]}>
            <Text style={styles.sectionTitle}>관심 운동</Text>
            <SetSportsCategory />
          </View>

          <View style={{ alignItems: 'center', marginVertical: 30 }}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleDeleteAccount}>
              <Text style={styles.accountDeleteText}>회원 탈퇴</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          onConfirm={alertConfig.onConfirm}
          onCancel={hideAlert}
          showCancel={alertConfig.showCancel !== false}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    ...LAYOUT_PADDING,
  },
  profileImgWrapper: {
    alignItems: 'center',
    marginVertical: 30,
    gap: SPACING.md,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  overlayText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
  },
  sectionWrapper: {
    gap: SPACING.xs,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontFamily: FONTS.PRETENDARD[700],
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.large,
    padding: SPACING.sm,
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[400],
    height: 48,
    justifyContent: 'center',
    lineHeight: FONT_SIZES.md * 1.5,
  },
  multilineInput: {
    height: 84,
    textAlignVertical: 'center',
    lineHeight: FONT_SIZES.md * 1.5,
  },
  accountDeleteText: {
    color: COLORS.red,
    fontSize: 18,
    fontFamily: FONTS.PRETENDARD[700],
  },
});
