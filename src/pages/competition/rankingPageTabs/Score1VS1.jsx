import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FriendOptionBottomSheet from '../../../components/BottomSheet/FriendOptionBottomSheet';
import CustomAlert from '../../../components/CustomAlert';
import CustomTag from '../../../components/CustomTag';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';
import { RADIUS } from '../../../constants/radius';
import { LAYOUT_PADDING, SPACING } from '../../../constants/space';
import { getFriendRelation } from '../../../utils/competition';

/* eslint-disable */

const { width } = Dimensions.get('window');

const dummyProfile = require('../../../assets/images/profile.png');
const crownImage = require('../../../assets/images/crown.png');

const Score1VS1 = ({
  competitionRecord,
  setCompetitionRecord,
  competitionData,
  progress,
  isParticipant,
  onLeave,
  onJoin,
  navigation,
}) => {
  const [selectedMember, setSelectedMember] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    onConfirm: null,
    showCancel: true,
  });

  const bottomSheetRef = useRef();

  const maxGraphWidth = width - 200;
  const minGraphWidth = 10;

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

  const getResult = (data1, data2) => {
    if (data1.total_score > data2.total_score) {
      return 'Win';
    } else if (data1.total_score === data2.total_score) {
      return 'Draw';
    } else {
      return 'Lose';
    }
  };

  const onUpdateData = (friendInfo) => {
    setCompetitionRecord(
      competitionRecord.map((e, i) => {
        if (e.member_info.id === selectedMember?.member_info?.id) {
          if (selectedMember?.friend_info?.status === 'none') {
            return {
              ...e,
              friend_info: friendInfo,
            };
          } else {
            return {
              ...e,
              friend_info: { status: 'none' },
            };
          }
        } else {
          return e;
        }
      }),
    );
  };

  const CompetitionProfile = ({ record, result, color, style }) => {
    const innerContainer = record && (
      <>
        <Image
          style={{ width: 80, height: 80 }}
          source={record.member_info.profile_image ? { uri: record.member_info.profile_image } : dummyProfile}
        />
        <View>
          <View style={styles.profileTextWrapper}>
            <Text style={styles.profileText}>{record.member_info.nickname}</Text>
            <Text style={styles.profileTailText}>님</Text>
          </View>
          <Text style={[styles.profileText, { color: color }]}>{record.total_score}</Text>
        </View>
        {progress === 'AFTER' && (
          <>
            <View
              style={[
                styles.resultTag,
                result === 'Win'
                  ? { backgroundColor: color }
                  : {
                      borderWidth: 2,
                      borderColor: color,
                    },
              ]}
            >
              <Text style={styles.resultTagText}>{result}</Text>
            </View>
            {result === 'Win' && <Image style={styles.crownImage} source={crownImage} />}
          </>
        )}
      </>
    );

    return (
      <>
        {record ? (
          <>
            {!record.is_my_record ? (
              <TouchableOpacity
                style={[styles.profileWrapper, progress === 'AFTER' && { marginTop: 15 }, style]}
                onLongPress={() => {
                  setSelectedMember(record);
                  bottomSheetRef.current?.present();
                }}
                activeOpacity={0.6}
              >
                {innerContainer}
              </TouchableOpacity>
            ) : (
              <View style={[styles.profileWrapper, progress === 'AFTER' && { marginTop: 15 }, style]}>
                {innerContainer}
              </View>
            )}
          </>
        ) : (
          <View style={[styles.profileWrapper, progress === 'AFTER' && { marginTop: 15 }, style]}>
            <Text style={[styles.profileTailText, { color: COLORS.white }]}>아직 상대방이 참여하지 않았어요..</Text>
          </View>
        )}
      </>
    );
  };

  const Competition1VS1Header = ({ data }) => {
    return (
      <View style={{ paddingBottom: 20 }}>
        <View style={styles.messageWrapper}>
          <Text style={styles.userNameText}>
            {(() => {
              if (data[1]) {
                if (progress === 'BEFORE') {
                  return '아직 경쟁 시작 전입니다';
                } else if (progress === 'IN_PROGRESS') {
                  return `${data[0].member_info.nickname} 님,`;
                } else {
                  if (data[0].total_score > data[1].total_score) {
                    return '따잇!';
                  } else if (data[0].total_score < data[1].total_score) {
                    return '아쉬워요.. 다음에는 따잇해봅시다!';
                  } else {
                    return '비겼네요!';
                  }
                }
              } else {
                return '아직 경쟁방이 다 안찼어요.';
              }
            })()}
          </Text>
          {progress === 'IN_PROGRESS' && (
            <Text style={styles.messageText}>
              {(() => {
                if (data[1]) {
                  if (data[0].total_score > data[1].total_score) {
                    return '지금 이기고 있네요! 계속 가봅시다';
                  } else if (data[0].total_score < data[1].total_score) {
                    return '지고있어요.. 조금만 더 힘내요!';
                  } else {
                    return '비기고 있어요! 조금만 더 해봅시다';
                  }
                } else {
                  return '';
                }
              })()}
            </Text>
          )}
        </View>
        <View style={styles.profileContainer}>
          <CompetitionProfile
            record={data[0]}
            color={COLORS.primary}
            result={progress === 'AFTER' && getResult(data[0], data[1])}
            style={
              progress === 'IN_PROGRESS' &&
              data[1] &&
              data[0].total_score >= data[1].total_score && {
                borderWidth: 3,
                borderColor: COLORS.primary,
              }
            }
          />
          <CompetitionProfile
            record={data[1]}
            color={COLORS.secondary}
            result={progress === 'AFTER' && getResult(data[1], data[0])}
            style={
              progress === 'IN_PROGRESS' &&
              data[1] &&
              data[1].total_score >= data[0].total_score && {
                borderWidth: 3,
                borderColor: COLORS.secondary,
              }
            }
          />
          <CustomTag size="small" text="vs" style={styles.vsTag} textStyle={styles.vsTagText} />
        </View>
        <View style={{ alignItems: 'center' }}>
          {progress === 'BEFORE' && (
            <TouchableOpacity style={styles.actionBtn} onPress={isParticipant ? onLeave : onJoin} activeOpacity={0.6}>
              <Text style={styles.actionBtnText}>{isParticipant ? '나가기' : '참여하기'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderScoreItem = ({ item, index }) => {
    if (progress === 'BEFORE') {
      return <></>;
    } else {
      return (
        <View style={styles.scoreWrapper}>
          <Text style={styles.scoreTitleText} numberOfLines={3} ellipsizeMode="tail">
            {item.name}
          </Text>
          <View style={styles.graphContainer}>
            <View style={styles.graphWrapper}>
              <View
                style={[
                  styles.graph,
                  competitionRecord[1] && {
                    backgroundColor: COLORS.primary,
                    width:
                      minGraphWidth +
                      (maxGraphWidth * competitionRecord[0].score_detail[index].score) /
                        (Math.max(
                          competitionRecord[1].score_detail[index].score,
                          competitionRecord[0].score_detail[index].score,
                        ) || 1),
                  },
                ]}
              />
              <Text style={styles.scoreText}>{competitionRecord[0].score_detail[index].score}</Text>
            </View>
            <View style={styles.graphWrapper}>
              <View
                style={[
                  styles.graph,
                  competitionRecord[1] && {
                    backgroundColor: COLORS.secondary,
                    width:
                      minGraphWidth +
                      (maxGraphWidth * competitionRecord[1].score_detail[index].score) /
                        (Math.max(
                          competitionRecord[0].score_detail[index].score,
                          competitionRecord[1].score_detail[index].score,
                        ) || 1),
                  },
                ]}
              />
              <Text style={styles.scoreText}>{competitionRecord[1]?.score_detail[index].score}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={[{ paddingTop: 30 }, LAYOUT_PADDING]}>
      {competitionRecord && (
        <FlatList
          data={competitionRecord[0].score_detail}
          keyExtractor={(item, index) => item.name}
          renderItem={renderScoreItem}
          ListHeaderComponent={<Competition1VS1Header data={competitionRecord} />}
          ListFooterComponent={<View style={{ height: 30 }} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        />
      )}
      <FriendOptionBottomSheet
        ref={bottomSheetRef}
        relation={() => getFriendRelation(selectedMember?.friend_info?.status)}
        memberData={{ ...selectedMember?.member_info, table_id: selectedMember?.friend_info?.id }}
        onUpdateData={onUpdateData}
        setAlertVisible={setAlertVisible}
        setAlertConfig={setAlertConfig}
        isCompetition={true}
        competitionRoomId={competitionData?.id}
        navigation={navigation}
      />
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        onConfirm={alertConfig.onConfirm}
        onCancel={hideAlert}
        showCancel={alertConfig.showCancel}
      />
    </View>
  );
};

export default Score1VS1;

const styles = StyleSheet.create({
  messageWrapper: {
    gap: 2,
  },
  userNameText: {
    fontSize: FONT_SIZES.xl,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  messageText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    color: COLORS.white,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  profileWrapper: {
    width: width / 2 - 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 30,
    backgroundColor: COLORS.darkGreyBackground,
  },
  profileTextWrapper: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  profileText: {
    textAlign: 'center',
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[700],
    lineHeight: 24,
    color: COLORS.white,
  },
  profileTailText: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.semiLightGrey,
  },
  vsTag: {
    position: 'absolute',
    top: 76,
    left: width / 2 - 40,
    width: 40,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  vsTagText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[500],
    color: COLORS.white,
  },
  resultTag: {
    position: 'absolute',
    bottom: -16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkGreyBackground,
    width: 60,
    height: 30,
    borderRadius: 8,
  },
  resultTagText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[600],
    color: COLORS.white,
  },
  crownImage: {
    position: 'absolute',
    top: -35,
    width: 50,
    height: 50,
  },
  scoreWrapper: {
    flexDirection: 'row',
    gap: SPACING.md,
    alignItems: 'center',
  },
  scoreTitleText: {
    width: 70,
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
    color: COLORS.white,
  },
  graphContainer: {
    gap: 2,
  },
  graphWrapper: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  graph: {
    height: 20,
    borderRadius: RADIUS.small,
  },
  scoreText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    color: COLORS.white,
  },
  actionBtn: {
    backgroundColor: COLORS.secondary,
    marginTop: SPACING.lg,
    paddingHorizontal: 36,
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
