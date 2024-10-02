import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';

const { width } = Dimensions.get('window');

const data = [
  {
    question:
      '질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 질문 1 ',
    answer: '답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 답변 1 ',
  },
  {
    question: '질문 2',
    answer: '답변 2',
  },
  {
    question: '질문 3',
    answer: '답변 3',
  },
];

const FAQ = () => {
  const [isItemOpen, setIsItemOpen] = useState([Array.from({ length: data.length }, () => false)]);

  // useEffect(() => {
  //   if (data) {
  //     setIsItemOpen(Array.from({ length: data.length }, () => false));
  //   }
  // }, [data]);

  const renderQuestionItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.questionWrapper}
        onPress={() =>
          setIsItemOpen(Array.from({ length: isItemOpen.length }, (_, i) => index === i && !isItemOpen[index]))
        }
        activeOpacity={0.6}
      >
        <View style={styles.questionHeaderWrapper}>
          <Text style={styles.questionMarkText}>Q.</Text>
          <Text style={styles.questionText}>{item.question}</Text>
          <FontAwesome name={isItemOpen[index] ? 'angle-up' : 'angle-down'} size={20} color={COLORS.white} />
        </View>
        {isItemOpen[index] && <Text style={styles.answerText}>{item.answer}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <HeaderComponents icon="none" title="FAQ" />
      <FlatList
        style={{ paddingTop: 20, paddingHorizontal: 20 }}
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={renderQuestionItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16 }}
      />
    </SafeAreaView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  questionWrapper: {
    gap: 8,
  },
  questionHeaderWrapper: {
    flexDirection: 'row',
    gap: 10,
  },
  questionMarkText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.primary,
  },
  questionText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
    width: width - 98,
  },
  answerText: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
    backgroundColor: COLORS.darkGreyBackground,
    padding: 16,
    borderRadius: 8,
  },
});
