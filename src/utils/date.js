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