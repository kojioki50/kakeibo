import dayjs, { Dayjs } from "dayjs";

export const DateHook = (month:dayjs.Dayjs): Dayjs[][] => {
  const firstDay = dayjs(new Date(month.year(), month.month(), 1)).day(); // 最初の日の曜日
  const lastDate = dayjs(new Date(month.year(), month.month() + 1, 0)).date();
  const dateCount = firstDay + lastDate;
  let calendarDay = 0 - firstDay;
  const calendarMatrix = new Array(Math.ceil(dateCount / 7)).fill(null).map(() => {
    return new Array(7).fill(0).map(() => {
      calendarDay++;
   return dayjs(new Date(month.year(), month.month(), calendarDay));
    });
  });
  return calendarMatrix;
};

