import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { getRecommendFriend } from '../../apis/friend/index';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';
import MemberProfileItem from '../MemberProfileItem';

const RecommendedFriends = ({ onOpenOptions }) => {
  const [recommendFriends, setRecommendFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { showToast } = useToastMessageStore();

  const fetchData = useCallback(async () => {
    try {
      const res = await getRecommendFriend(page);
      if (res.data?.length > 0) {
        setRecommendFriends((prev) => [...prev, ...res.data]);
      } else {
        setHasMore(false); // 더 이상 데이터가 없으면 상태 업데이트
      }
    } catch (err) {
      showToast('🚫 문제 발생! 다시 시도해주세요.', 'error', 'top');
    } finally {
      setLoading(false);
    }
  }, [page, showToast]);

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setLoading(true); // 로딩 상태 먼저 업데이트
      setPage((prev) => prev + 1); // 페이지 증가
    }
  };

  const renderItem = useCallback(
    ({ item }) => <MemberProfileItem memberData={item} onRightBtnPress={() => onOpenOptions(item)} />,
    [onOpenOptions],
  );

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.loadingText}>로딩 중...</Text>}
      <FlatList
        data={recommendFriends}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
      />
      {!hasMore && <Text style={styles.endText}>더 이상 추천 친구가 없습니다.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[600],
  },
  endText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[600],
    marginVertical: 10,
  },
});

export default RecommendedFriends;
