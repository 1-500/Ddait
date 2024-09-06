import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../../constants/space';
import { calculateDday } from '../../../utils/date';

const podiumImage = require('../../../assets/images/podium.png');
const spotlightImage = require('../../../assets/images/spotlight.png');
const crownImage = require('../../../assets/images/crown.png');
const dummyProfile = require('../../../assets/images/profile.png');

const { width: screenWidth } = Dimensions.get('window');

const RankList = ({ data, competitionData, progress, onJoin, onLeave }) => {
  const [podiumImageSize, setPodiumImageSize] = useState({ width: 0, height: 0 });
  const [spotlightImageSize, setSpotlightImageSize] = useState({ width: 0, height: 0 });
  const [isItemOpen, setIsItemOpen] = useState([]);

  const rankListRef = useRef();

  useEffect(() => {
    const podiumAssetSource = Image.resolveAssetSource(podiumImage);
    const podiumAspectRatio = podiumAssetSource.height / podiumAssetSource.width;
    const spotlightAssetSource = Image.resolveAssetSource(spotlightImage);
    const spotlightAspectRatio = spotlightAssetSource.height / spotlightAssetSource.width;
    const imageWidth = screenWidth - 40;
    setPodiumImageSize({ width: imageWidth - 36, height: (imageWidth - 36) * podiumAspectRatio });
    setSpotlightImageSize({ width: imageWidth, height: imageWidth * spotlightAspectRatio });
  }, []);

  useEffect(() => {
    if (data) {
      setIsItemOpen(Array.from({ length: data.length }, () => false));
    }
  }, [data]);

  const Podium = () => {
    return (
      <View>
        {data && (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.podiumWrapper}>
              {progress === 'AFTER' && (
                <Image
                  style={[
                    styles.spotlightImage,
                    { width: spotlightImageSize.width, height: spotlightImageSize.height },
                  ]}
                  source={spotlightImage}
                />
              )}
              <Image style={{ width: podiumImageSize.width, height: podiumImageSize.height }} source={podiumImage} />
              {data[0] && (
                <>
                  <Image
                    style={[
                      styles.rankerProfile,
                      {
                        bottom: 0.85 * podiumImageSize.height,
                      },
                    ]}
                    source={
                      data[0].member_info.profile_image ? { uri: data[0].member_info.profile_image } : dummyProfile
                    }
                  />
                  {progress === 'AFTER' && (
                    <Image
                      style={[styles.crownImage, { bottom: 0.85 * podiumImageSize.height + 74 }]}
                      source={crownImage}
                    />
                  )}
                </>
              )}
              {data[1] && (
                <Image
                  style={[
                    styles.rankerProfile,
                    {
                      bottom: 0.63 * podiumImageSize.height,
                      left: 16 + 0.05 * podiumImageSize.width,
                    },
                  ]}
                  source={data[1].member_info.profile_image ? { uri: data[1].member_info.profile_image } : dummyProfile}
                />
              )}
              {data[2] && (
                <Image
                  style={[
                    styles.rankerProfile,
                    {
                      bottom: 0.49 * podiumImageSize.height,
                      right: 16 + 0.05 * podiumImageSize.width,
                    },
                  ]}
                  source={data[2].member_info.profile_image ? { uri: data[2].member_info.profile_image } : dummyProfile}
                />
              )}
            </View>
            <TouchableOpacity
              style={styles.myRankBtn}
              onPress={() => {
                rankListRef.current.scrollToIndex({ animated: true, index: data.findIndex((e) => e.is_my_record) });
              }}
              activeOpacity={0.6}
            >
              <Text style={styles.myRankBtnText}>내 순위 보기</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const Preview = () => {
    const isParticipant = competitionData?.user_status?.is_participant;
    const startDate = dayjs(competitionData.date.start_date);
    const dday = calculateDday(startDate);

    return (
      <View style={styles.preview}>
        <Text style={styles.previewText}>
          {dday}일 후 랭킹전 시작! 🏆{'\n'} 1등 하고
          <Text style={{ color: COLORS.secondary }}> 따잇! </Text>할 준비 되셨나요?
        </Text>
        <View>
          <TouchableOpacity style={styles.actionBtn} onPress={isParticipant ? onLeave : onJoin} activeOpacity={0.6}>
            <Text style={styles.actionBtnText}>{isParticipant ? '나가기' : '참여하기'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const RankItemContent = ({ item, index }) => {
    return (
      <>
        <View style={styles.rankItemContentWrapper}>
          <Text style={styles.rankText}>{progress === 'BEFORE' ? '-' : index + 1}</Text>
          <Image
            style={styles.profileImg}
            source={item.member_info.profile_image ? { uri: item.member_info.profile_image } : dummyProfile}
          />
          <Text style={styles.rankText}>{item.member_info.nickname}</Text>
        </View>
        <View style={[styles.rankItemContentWrapper, { gap: 30 }]}>
          {!isItemOpen[index] && (
            <Text
              style={[
                styles.rankText,
                { fontFamily: FONTS.PRETENDARD[600] },
                item.is_my_record ? { color: COLORS.white } : { color: COLORS.lightPurple },
              ]}
            >
              {`${item.total_score}점`}
            </Text>
          )}
          {progress === 'BEFORE' ? (
            <View style={{ width: 24 }} />
          ) : (
            <FontAwesome name={isItemOpen[index] ? 'angle-up' : 'angle-down'} size={24} color={COLORS.white} />
          )}
        </View>
      </>
    );
  };

  const renderRankItem = ({ item, index }) => {
    if (progress === 'IN_PROGRESS') {
      return (
        <TouchableOpacity
          style={[
            styles.rankItemWrapper,
            item.is_my_record ? { backgroundColor: COLORS.primary } : { backgroundColor: COLORS.darkGreyBackground },
          ]}
          onPress={() =>
            setIsItemOpen(Array.from({ length: isItemOpen.length }, (_, i) => index === i && !isItemOpen[index]))
          }
          activeOpacity={0.6}
        >
          <View style={styles.rankItemHeaderWrapper}>
            <RankItemContent item={item} index={index} />
          </View>
          {isItemOpen[index] && (
            <View style={styles.innerContentWrapper}>
              {data[0].score_detail.map((e, i) => (
                <Text
                  key={`${e.name}_${index}`}
                  style={styles.scoreText}
                >{`${e.name}: ${item.score_detail[i].score}점`}</Text>
              ))}
              <Text
                style={[
                  styles.rankText,
                  { fontFamily: FONTS.PRETENDARD[600], marginTop: 4 },
                  item.is_my_record ? { color: COLORS.white } : { color: COLORS.lightPurple },
                ]}
              >{`총점: ${item.total_score}점`}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    } else if (progress === 'BEFORE') {
      return (
        <View
          style={[
            styles.rankItemWrapper,
            styles.rankItemHeaderWrapper,
            item.is_my_record ? { backgroundColor: COLORS.primary } : { backgroundColor: COLORS.darkGreyBackground },
          ]}
        >
          <RankItemContent item={item} index={index} />
        </View>
      );
    }
  };

  return (
    <View style={[{ flex: 1 }, LAYOUT_PADDING]}>
      <FlatList
        style={{ flex: 1 }}
        ref={rankListRef}
        keyExtractor={(item, index) => index}
        data={data}
        renderItem={renderRankItem}
        ListHeaderComponent={progress === 'BEFORE' ? Preview : Podium}
        ListFooterComponent={<View style={{ height: 30 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default RankList;

const styles = StyleSheet.create({
  podiumWrapper: {
    backgroundColor: COLORS.darkGreyBackground,
    paddingTop: 120,
    marginTop: 30,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  spotlightImage: {
    position: 'absolute',
    top: 10,
    resizeMode: 'cover',
  },
  crownImage: {
    position: 'absolute',
    width: 50,
    height: 50,
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
    fontFamily: FONTS.PRETENDARD[600],
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
  rankItemContentWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  profileImg: {
    width: 40,
    height: 40,
  },
  rankText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  innerContentWrapper: {
    paddingBottom: SPACING.md,
  },
  scoreText: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
    paddingVertical: SPACING.xxs,
  },
  preview: {
    backgroundColor: '#2B2B2B',
    paddingVertical: 30,
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 30,
    marginBottom: 10,
  },
  previewText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.PRETENDARD[600],
    textAlign: 'center',
  },
  actionBtn: {
    backgroundColor: COLORS.secondary,
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 6,
    borderRadius: 50,
  },
  actionBtnText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[600],
    lineHeight: 20,
    color: '#FFF',
  },
});
