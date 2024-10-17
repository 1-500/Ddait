import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { getFAQ } from '../../apis/faq';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';

/* eslint-disable */

const { width } = Dimensions.get('window');

const FAQ = () => {
  const { showToast } = useToastMessageStore();
  const isFocused = useIsFocused();
  const [data, setData] = useState();
  const [isItemOpen, setIsItemOpen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const result = await getFAQ();
        setData(result.data);
      } catch (error) {
        showToast('FAQ 정보 조회 실패', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchFAQ();
  }, [isFocused]);

  useEffect(() => {
    if (data) {
      setIsItemOpen(Array.from({ length: data.length }, () => false));
    }
  }, [data]);

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
      {loading ? (
        <View style={{ padding: 20 }}>
          <SkeletonLoader type="list" />
        </View>
      ) : (
        <FlatList
          style={{ paddingTop: 20, paddingHorizontal: 20 }}
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={renderQuestionItem}
          ListEmptyComponent={<Text style={styles.emptyText}>아직 질문이 없어요..</Text>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
        />
      )}
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
  emptyText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[600],
    color: COLORS.white,
  },
});
