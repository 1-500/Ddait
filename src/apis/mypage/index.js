import { Platform } from 'react-native';
import uuid from 'react-native-uuid';

import { supabase } from '../../lib/supabaseClient';
import { API } from '..';

/* eslint-disable no-console */

export const postLogout = async () => {
  try {
    const response = await API.post('/logout');

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (updatedData) => {
  try {
    // 빈 객체인 경우 early return
    if (Object.keys(updatedData).length === 0) {
      return { message: '업데이트할 정보가 없습니다.' };
    }

    let profileImageUrl = null;

    if (updatedData.profileImage && typeof updatedData.profileImage === 'string') {
      const imageName = uuid.v4(); // 고유한 이미지 이름 생성
      const uriParts = updatedData.profileImage.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const filePath =
        Platform.OS === 'ios' ? updatedData.profileImage.replace('file://', '') : updatedData.profileImage;

      const file = {
        uri: filePath,
        type: `image/${fileType}`,
        name: `${imageName}.${fileType}`,
      };

      const { data, error } = await supabase.storage.from('profile-images').upload(`images/${imageName}`, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        throw new Error('프로필 이미지 업로드에 실패했습니다.');
      }

      const { data: urlData } = supabase.storage.from('profile-images').getPublicUrl(`images/${imageName}`);

      profileImageUrl = urlData.publicUrl;
    }

    const apiData = {
      ...updatedData,
      profile_image: profileImageUrl,
    };

    delete apiData.profileImage; // 원본 파일 경로 제거

    console.log('프로필 정보 변경:', { ...apiData, profile_image: profileImageUrl ? '[IMAGE_URL]' : null });

    const response = await API.patch('/users/profile', apiData);
    return response.data;
  } catch (error) {
    console.error('API 요청 중 error:', error.response || error);
    if (error.response && error.response.status === 400) {
      throw new Error('프로필 정보 업데이트 실패');
    }
    throw error;
  }
};
