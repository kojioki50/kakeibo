import dayjs from "dayjs"
import { useCallback, useState } from "react"
import { balanceType } from "../types/type"

interface Selected {
  dayArray: dayjs.Dayjs;
  balances: balanceType[];
}

interface ReturnType {
  targetedDay: (props: Selected) => void;
  targetDay: balanceType | null;
  selectDay: string
}

export const DaySelect = ():ReturnType => {
  const [targetDay, setTargetDay] = useState<balanceType | null>(null);
  const [selectDay, setSelectDay] = useState<string>("");
  const targetedDay = useCallback((props: Selected) => {
    const { dayArray, balances } = props;
    setSelectDay(dayArray.format("YY年MM月DD日"))
    const targetDay = balances.find((balance) => String(balance.day) === dayArray.format("YY年MM月DD日"));
    setTargetDay(targetDay ?? null);
  }, [])
  return {targetDay, targetedDay,selectDay}
}