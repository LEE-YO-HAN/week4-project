export const todayDate = () => {
  const TODAY = new Date();
  const YEAR = TODAY.getFullYear();
  const MONTH = TODAY.getMonth();
  const DATE = TODAY.getDate();

  return `${YEAR}-${MONTH + 1}-${DATE}`;
};
