import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS, HEADER_FONT_SIZES } from '../../constants/font';
import { ELEMENT_VERTICAL_MARGIN } from '../../constants/space';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';

/**
 * '더보기' 버튼을 포함시킬 수 있는 타이틀 컴포넌트입니다.
 * 사용자가 '더보기'를 클릭하면 지정된 화면으로 네비게이션합니다.
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.title - 제목 텍스트
 * @param {Object} [props.navigation] - 네비게이션 객체 (react-navigation에서 제공)
 * @param {string} [props.navigateTo] - 네비게이션할 화면의 이름
 * @param {boolean} [props.showMore=true] - '더보기' 버튼 표시 여부
 */
const SectionTitle = ({ title, navigation, navigateTo, showMore = false }) => {
  const { showToast } = useToastMessageStore();

  const handlePress = () => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    } else {
      showToast('아직 준비 중인 기능이에요! 곧 찾아뵐게요 💪', 'error');
    }
  };

  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.titleText}>{title}</Text>
      {showMore && (
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={styles.moreText}>더보기</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...ELEMENT_VERTICAL_MARGIN,
  },
  titleText: {
    fontSize: HEADER_FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  moreText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    color: COLORS.white,
  },
});

export default SectionTitle;
