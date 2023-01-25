import { useContext } from "react";
import { MonthInfoContext, monthType } from "../provider/MonthInfoProvider";

export const MonthProvider = ():monthType=> useContext(MonthInfoContext)