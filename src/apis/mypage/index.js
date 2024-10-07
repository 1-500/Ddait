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

    let profileImageUrl = updatedData.profileImage;

    // 프로필 이미지 변경이 있으면 슈퍼베이스 storage에 업로드
    if (updatedData.profileImage && updatedData.profileImage.startsWith('file://')) {
      const fileName = `profile_${Date.now()}.jpg`;
      const filePath = updatedData.profileImage.replace('file://', '');
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(fileName, filePath, { contentType: 'image/jpeg' });

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('profile-images').getPublicUrl(data.path);

      profileImageUrl = publicUrl;
    }

    // API 요청 데이터 준비
    const apiData = {
      ...updatedData,
      profile_image: profileImageUrl,
    };

    delete apiData.profileImage; // 원본 파일 경로 제거

    console.log('프로필 정보 변경:', apiData);
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
