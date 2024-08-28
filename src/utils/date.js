export const getYears = () => {
  const startYear = 1930;
  const endYear = new Date().getFullYear();
  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push({ label: year.toString(), value: year.toString() });
  }

  return years;
};

export const getMonths = () => {
  const months = [];

  for (let month = 1; month <= 12; month++) {
    months.push({
      label: month.toString().padStart(2, '0'),
      value: month.toString().padStart(2, '0'),
    });
  }

  return months;
};

export const getDays = () => {
  return Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }));
};

export const formDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}`;
};

// workoutDiary
export const getWeekOfMonth = (date) => {
  const startWeekDayIndex = 0; // 일요일 0, 월요일 1
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const numOfDays = lastDate.getDate();
  const weekInMonth = Math.ceil((date.getDate() + firstDate.getDay() - startWeekDayIndex) / 7);

  return weekInMonth;
};

export const getStartOfWeek = (date) => {
  const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1));
  return startOfWeek;
};

export const getEndOfWeek = (date) => {
  const endOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 7)); // 일요일 끝
  return endOfWeek;
};

export const formatDate = (date) => {
  const day = date.getDate();
  return day;
  /**
   * 주어진 날짜 객체를 ISO 8601 형식의 문자열로 변환합니다.
   *
   * @param {Object} date : 날짜를 나타내는 객체. 객체는 다음 속성을 가져야 합니다:
   *   - {string} year - 연도 (4자리)
   *   - {string} month - 월
   *   - {string} day - 일
   * @param {boolean} [isEnd=false] : 종료 날짜인 경우 true, 시작 날짜인 경우 false. 기본값은 false입니다.
   * @returns {string} 예: "2024-08-27T00:00:00Z" (시작 날짜의 경우) 또는 "2024-08-27T23:59:59Z" (종료 날짜의 경우)
   */
};

export const formatDate_ISO8601 = (date, isEnd = false) => {
  const dayTime = isEnd ? '23:59:59' : '00:00:00';
  return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}T${dayTime}Z`;
};
