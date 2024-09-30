import dayjs from 'dayjs';
import React from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getCompetitionDetail } from '../../apis/competition';
import { deleteNotification, patchNotification } from '../../apis/notification';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS } from '../../constants/font';
import { LAYOUT_PADDING, SPACING } from '../../constants/space';
import { useNotificationStore } from '../../store/notification';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';

/* eslint-disable */

const relativeTime = require('dayjs/plugin/relativeTime');
const updateLocale = require('dayjs/plugin/updateLocale');
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'recent',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});
dayjs.updateLocale('ko', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'recent',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});

const { width } = Dimensions.get('window');

const Notification = ({ navigation }) => {
  const { showToast } = useToastMessageStore();
  const { notificationList, setNotificationList } = useNotificationStore();

  const fetchCompetitionDetail = async (id) => {
    try {
      const result = await getCompetitionDetail(id);
      return result;
    } catch (error) {
      showToast(`경쟁방 정보 조회 실패: ${error.message}`, 'error');
    }
  };

  const handlePressNotification = async (notification) => {
    switch (notification.type) {
      case 'competition_invite':
        const competitionDetail = await fetchCompetitionDetail(notification.relation_table_id);
        if (competitionDetail.error) {
          showToast(
            '찾으시는 경쟁방이 없어요 🥹',
            'error',
            undefined,
            undefined,
            undefined,
            '알림 데이터를 삭제할게요.',
          );
          await deleteNotification(notification.id);
          setNotificationList(notificationList.filter((element) => element.id !== notification.id));
          return;
        }

        if (competitionDetail.data.info.max_members === 2) {
          navigation.navigate('CompetitionRoom1VS1', {
            competitionId: notification.relation_table_id,
            isParticipant: false,
          });
        } else {
          navigation.navigate('CompetitionRoomRanking', {
            competitionId: notification.relation_table_id,
            isParticipant: false,
          });
        }
        break;
      case 'friends':
        navigation.navigate('Friend', { initialIndex: 1 });
        break;
    }

    if (!notification.read) {
      await patchNotification(notification.id, true);
      setNotificationList(
        notificationList.map((element) => {
          if (element.id === notification.id) {
            return {
              ...element,
              read: true,
            };
          } else {
            return element;
          }
        }),
      );
    }
  };

  const renderNotificationItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.notificationContainer}
        activeOpacity={0.6}
        onPress={() => handlePressNotification(item)}
      >
        <View style={styles.notificationWrapper}>
          {(() => {
            switch (item.type) {
              case 'competition_invite':
                return (
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color={item.read ? COLORS.lightGrey : COLORS.white}
                  />
                );
              case 'friends':
                return (
                  <MaterialCommunityIcons
                    name="account-multiple-plus-outline"
                    size={24}
                    color={item.read ? COLORS.lightGrey : COLORS.white}
                  />
                );
              default:
                return (
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    size={24}
                    color={item.read ? COLORS.lightGrey : COLORS.white}
                  />
                );
            }
          })()}
          <View style={{ gap: SPACING.xxs }}>
            <Text style={[styles.titleText, item.read ? { color: COLORS.lightGrey } : { color: COLORS.white }]}>
              {item.title}
            </Text>
            <Text style={[styles.messageText, item.read ? { color: COLORS.lightGrey } : { color: COLORS.white }]}>
              {item.message}
            </Text>
          </View>
        </View>
        <View style={styles.relativeTime}>
          <Text style={[styles.relativeTimeText, item.read ? { color: COLORS.lightGrey } : { color: COLORS.white }]}>
            {dayjs(item.created_at).fromNow(true)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <HeaderComponents title="알림" icon="none" />
      <View style={[{ flex: 1 }, LAYOUT_PADDING]}>
        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item, index) => index}
          data={notificationList}
          renderItem={renderNotificationItem}
          ListFooterComponent={<View style={{ height: 30 }} />}
          ListEmptyComponent={<Text style={styles.emptyText}>아직 알림이 없어요..</Text>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkBorder,
  },
  notificationWrapper: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'center',
  },
  titleText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[600],
    maxWidth: width - 130,
  },
  messageText: {
    fontSize: FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[400],
    maxWidth: width - 130,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    fontFamily: FONTS.PRETENDARD[500],
    marginTop: 20,
    color: COLORS.white,
  },
  relativeTime: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  relativeTimeText: {
    fontSize: FONT_SIZES.xs,
    fontFamily: FONTS.PRETENDARD[400],
  },
});
