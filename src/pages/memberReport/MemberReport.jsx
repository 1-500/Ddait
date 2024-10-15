import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { postMemberReport } from '../../apis/memberReport';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import HeaderComponents from '../../components/HeaderComponents';
import SettingItem from '../../components/SettingItem';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';

const { height } = Dimensions.get('window');

const MemberReport = ({ navigation, route }) => {
  const { showToast } = useToastMessageStore();
  const { reported_member, competition_room_id } = route.params;
  const [optionList] = useState([
    '경쟁 기록에 부정을 저질렀습니다.',
    '경쟁방 제목에 타인에 대한 욕설 또는 비방이 포함되어 있습니다. (경쟁방 방장만)',
    '기타',
  ]);
  const [selected, setSelected] = useState(0);
  const [description, setDescription] = useState('');

  const handlePressSubmit = async () => {
    try {
      await postMemberReport(reported_member.id, competition_room_id, optionList[selected], description);
      showToast('신고가 접수되었습니다.', 'success');
      navigation.goBack();
    } catch (error) {
      showToast('오류가 발생했습니다.', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ minHeight: height }}>
            <HeaderComponents icon="none" title="유저 신고" />
            <View style={styles.headerWrapper}>
              <Text style={styles.titleText}>신고 회원:</Text>
              <Text style={styles.nicknameText}>{reported_member.nickname}</Text>
              <Text style={styles.emailText}>{reported_member.email}</Text>
            </View>
            <Text style={[styles.titleText, { padding: 20 }]}>신고 유형을 선택해주세요.</Text>
            {optionList.map((option, index) => (
              <SettingItem
                title={option}
                leftBtn="radio"
                isRadioActive={selected === index}
                onPress={() => setSelected(index)}
              />
            ))}
            <Text style={[styles.titleText, { padding: 20 }]}>이 유저를 신고하려는 이유를 알려주세요.</Text>
            <View style={styles.descriptionWrapper}>
              <CustomInput
                size="stretch"
                theme="primary"
                multiline={true}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View style={styles.submitButtonWrapper}>
              <CustomButton theme="primary" size="large" text="제출" onPress={handlePressSubmit} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MemberReport;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  nicknameText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[600],
    color: COLORS.white,
  },
  emailText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.semiLightGrey,
  },
  titleText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
    paddingRight: 4,
  },
  descriptionWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  submitButtonWrapper: {
    padding: 20,
  },
});
