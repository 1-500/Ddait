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
    months.push({ label: month.toString(), value: month.toString() });
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
};
