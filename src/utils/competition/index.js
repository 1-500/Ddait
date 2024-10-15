import dayjs from 'dayjs';

export const getCompetitionProgress = (roomData) => {
  const today = dayjs();
  const startDate = dayjs(roomData.date.start_date);
  const endDate = dayjs(roomData.date.end_date);
  if (today < startDate) {
    return 'BEFORE';
  } else if (today <= endDate) {
    return 'IN_PROGRESS';
  } else {
    return 'AFTER';
  }
};

export const getFriendRelation = (status) => {
  switch (status) {
    case '대기':
      return 'requested';
    case '승인':
      return 'friend';
    default:
      return 'none';
  }
};
