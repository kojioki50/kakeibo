/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import dayjs, { Dayjs } from "dayjs";
import React, { createContext, ReactElement, ReactNode, useState } from "react";

export type monthType = {
  monthIndex: Dayjs;
  setMonthIndex: React.Dispatch<React.SetStateAction<Dayjs>>;
};

export const MonthInfoContext = createContext<monthType>({} as monthType);

export const MonthInfoProvider = (props: { children: ReactNode }): ReactElement => {
  const year = dayjs().year();
  const month = dayjs().month();
  const date = dayjs().date();
  const { children } = props;

  const [monthIndex, setMonthIndex] = useState<dayjs.Dayjs>(dayjs(new Date(year,month,date)));

  return <MonthInfoContext.Provider value={{ monthIndex, setMonthIndex }}>{children}</MonthInfoContext.Provider>;
};
