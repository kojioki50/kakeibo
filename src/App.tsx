/* eslint-disable react/display-name */
import { Dayjs } from "dayjs";
import { FC, memo, useEffect, useState } from "react";
import "./App.css";
import { Calendar } from "./components/pages/Calendar";
import { Header } from "./components/pages/Header";
import { BalancesGet } from "./hooks/BalancesGet";
import { DateHook } from "./hooks/DateHook";
import { MonthProvider } from "./hooks/MonthProvider";

const App: FC = memo(() => {
  useEffect(() => {
    (async () => {
      await getBalance();
    })().catch((e) => {
      console.log(e);
    });
  }, []);

  const { monthIndex } = MonthProvider();
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(DateHook(monthIndex));
  const { getBalance } = BalancesGet();

  useEffect(() => {
    setCurrentMonth(DateHook(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className=" flex flex-col min-w-max">
        <Header />
        <Calendar currentMonth={currentMonth} />
      </div>
    </>
  );
});

export default App;
