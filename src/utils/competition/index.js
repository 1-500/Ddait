import dayjs from 'dayjs';

export const isInCompetitionProgress = (roomData) => {
  const today = dayjs();
  const startDate = dayjs(roomData.date.start_date);
  const endDate = dayjs(roomData.date.end_date);
  return startDate <= today && today <= endDate;
};
