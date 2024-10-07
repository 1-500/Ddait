import RNFS from 'react-native-fs';

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
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      throw new Error('세션 오류: ' + sessionError.message);
    }
    if (!session) {
      throw new Error('로그인이 필요합니다.');
    }
    console.log('Session user:', session.user);

    // 빈 객체인 경우 early return
    if (Object.keys(updatedData).length === 0) {
      return { message: '업데이트할 정보가 없습니다.' };
    }

    let profileImageUrl = updatedData.profileImage;

    console.log('Received profile image:', profileImageUrl);

    if (profileImageUrl && typeof profileImageUrl === 'string') {
      console.log('New profile image detected');
      const fileName = `profile_${Date.now()}.jpg`;
      const filePath = profileImageUrl;

      console.log('Reading file:', filePath);
      try {
        const fileContent = await RNFS.readFile(filePath, 'base64');
        console.log('File read successfully');

        console.log('Uploading to Supabase');
        const { data, error } = await supabase.storage
          .from('profile-images')
          .upload(fileName, fileContent, { contentType: 'image/jpeg' });

        if (error) {
          console.error('Supabase upload error:', JSON.stringify(error, null, 2));
          throw error;
        }

        console.log('Supabase upload successful:', data);

        const { data: urlData } = supabase.storage.from('profile-images').getPublicUrl(data.path);

        profileImageUrl = urlData.publicUrl;
        console.log('새 프로필 이미지 url: ', profileImageUrl);
      } catch (fileError) {
        console.error('File read or upload error:', fileError);
        // 파일 읽기나 업로드 실패 시 기존 이미지 URL 유지
      }
    } else {
      console.log('No new profile image to upload');
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
      console.error('Profile update error:', error);
      throw new Error('프로필 정보 업데이트 실패');
    }
    throw error;
  }
};
