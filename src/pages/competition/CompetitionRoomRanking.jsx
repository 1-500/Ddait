import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CompetitionRoomHeader from '../../components/CompetitionRoomHeader';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS } from '../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';

const podiumImage = require('../../assets/images/podium.png');

const { width: screenWidth } = Dimensions.get('window');

const dummy_data = {
  room_info: {
    title: '스쿼트 챌린지 들어오세요!',
    max_members: 20,
    competition_type: '웨이트트레이닝',
    competition_theme: '경쟁 세부 테마',
    is_public: true,
    start_date: new Date(2024, 7, 1), //2024-08-01
    end_date: new Date(2024, 7, 31), //2024-08-31
  },
  result: [
    {
      name: '나라1',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 1,
      score: {
        total: 127,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라2',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 2,
      score: {
        total: 125,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라3',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 3,
      score: {
        total: 122,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라4',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 4,
      score: {
        total: 118,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '따잇',
      profileImg: require('../../assets/images/profile.png'),
      isMe: true,
      rank: 5,
      score: {
        total: 106,
        data1: 22,
        data2: 16,
      },
    },
    {
      name: '나라5',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 6,
      score: {
        total: 102,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라6',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 7,
      score: {
        total: 88,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라7',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 8,
      score: {
        total: 83,
        data1: 18,
        data2: 14,
      },
    },
    {
      name: '나라8',
      profileImg: require('../../assets/images/profile.png'),
      isMe: false,
      rank: 9,
      score: {
        total: 77,
        data1: 18,
        data2: 14,
      },
    },
  ],
  usage_data: ['data1', 'data2'],
};

const CompetitionRoomRanking = () => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isItemOpen, setIsItemOpen] = useState(Array.from({ length: dummy_data.result.length }, () => false));

  const rankListRef = useRef();

  useEffect(() => {
    const assetSource = Image.resolveAssetSource(podiumImage);
    const aspectRatio = assetSource.height / assetSource.width;
    const imageWidth = screenWidth - 76;
    setImageSize({ width: imageWidth, height: imageWidth * aspectRatio });
  }, []);

  const Podium = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={styles.podiumWrapper}>
          <Image style={{ width: imageSize.width, height: imageSize.height }} source={podiumImage} />
          <Image
            style={[
              styles.rankerProfile,
              {
                bottom: 0.85 * imageSize.height,
              },
            ]}
            source={dummy_data.result[0].profileImg}
          />
          <Image
            style={[
              styles.rankerProfile,
              {
                bottom: 0.63 * imageSize.height,
                left: 16 + 0.05 * imageSize.width,
              },
            ]}
            source={dummy_data.result[1].profileImg}
          />
          <Image
            style={[
              styles.rankerProfile,
              {
                bottom: 0.49 * imageSize.height,
                right: 16 + 0.05 * imageSize.width,
              },
            ]}
            source={dummy_data.result[2].profileImg}
          />
        </View>
        <TouchableOpacity
          style={styles.myRankBtn}
          onPress={() => {
            rankListRef.current.scrollToIndex({ animated: true, index: dummy_data.result.findIndex((e) => e.isMe) });
          }}
          activeOpacity={0.6}
        >
          <Text style={styles.myRankBtnText}>내 순위 보기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderRankItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.rankItemWrapper,
          item.isMe ? { backgroundColor: COLORS.primary } : { backgroundColor: COLORS.darkGreyBackground },
        ]}
        onPress={() =>
          setIsItemOpen(Array.from({ length: isItemOpen.length }, (_, i) => index === i && !isItemOpen[index]))
        }
        activeOpacity={0.6}
      >
        <View style={styles.rankItemHeaderWrapper}>
          <Text style={styles.rankText}>{item.rank}</Text>
          <Text style={styles.rankText}>{item.name}</Text>
          <FontAwesome name={isItemOpen[index] ? 'angle-up' : 'angle-down'} size={24} color={COLORS.white} />
        </View>
        {isItemOpen[index] && (
          <View style={styles.innerContentWrapper}>
            {dummy_data.usage_data.map((name, index) => (
              <Text key={index} style={styles.scoreText}>{`${name}: ${item.score[name]}점`}</Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <CompetitionRoomHeader data={dummy_data.room_info} />
      <View style={[{ flex: 1 }, LAYOUT_PADDING]}>
        <FlatList
          style={{ flex: 1 }}
          ref={rankListRef}
          keyExtractor={(item, index) => index} // 나중에 member table id로 변경하기
          data={dummy_data.result}
          renderItem={renderRankItem}
          ListHeaderComponent={Podium}
          ListFooterComponent={<View style={{ height: 30 }} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CompetitionRoomRanking;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  podiumWrapper: {
    backgroundColor: COLORS.darkGreyBackground,
    paddingTop: 100,
    marginTop: 30,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  rankerProfile: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  myRankBtn: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xxs,
    marginTop: SPACING.md,
    marginBottom: 6,
    borderRadius: 50,
    backgroundColor: '#7C7C7C',
  },
  myRankBtnText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: 20,
    color: COLORS.white,
  },
  rankItemWrapper: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    borderRadius: 16,
  },
  rankItemHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: SPACING.md,
  },
  rankText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  innerContentWrapper: {
    paddingBottom: SPACING.md,
  },
  scoreText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.white,
    paddingVertical: SPACING.xxs,
  },
});
