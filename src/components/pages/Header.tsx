/* eslint-disable react/display-name */
import dayjs from "dayjs";
import { FC, memo } from "react";
import { useRecoilValue } from "recoil";
import { MonthProvider } from "../../hooks/MonthProvider";
import { balancesState } from "../../recoil/recoilState";
import { HeaderButton } from "../button/HeaderButton";

export const Header: FC = memo(() => {
  const year = dayjs().year();
  const month = dayjs().month();
  const date = dayjs().date();
  const { monthIndex, setMonthIndex } = MonthProvider();
  const balances = useRecoilValue(balancesState);

  const thisMonth = balances.filter((balance) => {
    return balance.day.substring(0, 5) === monthIndex.format("YY年MM");
  });

  const plusSum = (): number => {
    let i = 0;
    thisMonth.map((balance) => {
      return (i += Number(balance.plus));
    });
    return i;
  };

  const minusSum = (): number => {
    let i = 0;
    thisMonth.map((balance) => {
      return (i -= balance.minus);
    });
    return i;
  };

  const totalSum = (): number => {
    return Number(plusSum()) + Number(minusSum());
  };

  const onClickPrev = (): void => {
    setMonthIndex(monthIndex.subtract(1, "M"));
  };
  const onClickNext = (): void => {
    setMonthIndex(monthIndex.add(1, "M"));
  };

  const onCLickReset = (): void => {
    setMonthIndex(dayjs(new Date(year, month, date)));
  };
  return (
    <header>
      <div className="min-w-max mx-auto px-4 py-2 flex items-center justify-around mx-10 justify-items-center">
        <h1 className="text-xl text-gray-500 font-bold select-none">Calendar</h1>
        <HeaderButton onClick={onCLickReset}>
          <span className="border rounded ml-2 py-2 px-4 select-none">Today</span>
        </HeaderButton>
        <HeaderButton onClick={onClickPrev}>
          <span className="cursor-pointer text-gray-600 py-2 px-3 select-none">←</span>
        </HeaderButton>
        <HeaderButton onClick={onClickNext}>
          <span className="cursor-pointer  text-gray-600 py-2 px-3 select-none">→</span>
        </HeaderButton>
        <h2 className="text-gray-500 font-bold mx-2 select-none">
          {dayjs(new Date(monthIndex.year(), monthIndex.month())).format("MMMM YYYY")}
        </h2>
        <span className="inline-block w-auto h-10 text-center  bg-blue-600 text-white p-2 select-none">
          収入{plusSum()}
        </span>
        <span className="inline-block w-auto h-10 mx-2 text-center bg-red-600 text-white p-2 select-none">
          支出{minusSum()}
        </span>
        <span className="inline-block w-auto h-10  text-center bg-gray-900 text-white p-2 select-none">
          合計{totalSum()}
        </span>
      </div>
    </header>
  );
});
