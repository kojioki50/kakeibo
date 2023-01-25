/* eslint-disable react/display-name */
import dayjs, { Dayjs } from "dayjs";
import React, { FC, memo, useCallback } from "react";
import { MonthProvider } from "../../hooks/MonthProvider";

import { useRecoilState, useRecoilValue } from "recoil";
import { balancesState, modalDeleteState, modalOpenState } from "../../recoil/recoilState";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { balanceType } from "../../types/type";
import { DayModal } from "../modal/DayModal";
import { DaySelect } from "../../hooks/DaySelect";
import { DeleteModal } from "../modal/DeleteModal";
import { CalendarButton } from "../button/CalendarButton";

interface Props {
  currentMonth: Dayjs[][];
}

export const Calendar: FC<Props> = memo((props) => {
  const { monthIndex } = MonthProvider();
  const { currentMonth } = props;
  const [editModalIsOpen, setEditModalIsOpen] = useRecoilState(modalOpenState);
  const [deleteModel, setDeleteModal] = useRecoilState(modalDeleteState);
  const balances = useRecoilValue(balancesState);
  const { targetedDay, targetDay, selectDay } = DaySelect();

  const thisMonth = (dayArray: Dayjs): boolean => {
    return dayArray.format("M") !== monthIndex.format("M");
  };

  const currentDay = (dayArray: Dayjs): string => {
    return dayArray.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "bg-black text-white rounded m-auto" : "";
  };
  const flag = (dayArray: Dayjs): string => {
    return thisMonth(dayArray) ? "bg-green-700 text-white" : "";
  };

  const onCLickModal = useCallback((balances: balanceType[], dayArray: dayjs.Dayjs): void => {
    targetedDay({ balances, dayArray });
    setEditModalIsOpen(true);
  }, []);

  const onClickDelete = useCallback((balances: balanceType[], dayArray: dayjs.Dayjs) => {
    targetedDay({ balances, dayArray });
    setDeleteModal(true);
  }, []);

  return (
    <div className="relative">
      <div className="flex-1 grid grid-cols-7 grid-rows-1 p-10 pb-0 w-full">
        <div className="border border-gray-300 text-center">日</div>
        <div className="border border-gray-300 text-center">月</div>
        <div className="border border-gray-300 text-center">火</div>
        <div className="border border-gray-300 text-center">水</div>
        <div className="border border-gray-300 text-center">木</div>
        <div className="border border-gray-300 text-center">金</div>
        <div className="border border-gray-300 text-center">土</div>
      </div>
      <div className="flex-1 grid grid-cols-7 grid-rows-5 p-10 pt-0 min-w-max">
        {currentMonth.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((dayArray, index) => (
              <React.Fragment key={index}>
                <div
                  className={`border border-gray-300
                ${flag(dayArray)}`}
                  key={index}
                >
                  <CalendarButton
                    onClick={() => onCLickModal(balances, dayArray)}
                    variant="openModal"
                    disabled={thisMonth(dayArray)}
                  >
                    <p className={`text-base mt-1 mb-5 select-none ${currentDay(dayArray)}`}>{dayArray.format("DD")}</p>
                    <div className="ml-7">
                      {balances.map((balance) => {
                        return (
                          <React.Fragment key={balance._id}>
                            {dayArray.format("YY年MM月DD日") === balance.day ? (
                              <span className={balance.plus - balance.minus >= 0 ? "text-blue-600" : "text-red-600"}>
                                {balance.plus - balance.minus}
                              </span>
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        );
                      })}
                      <PencilSquareIcon className="h-3 w-5 inline-block" />
                    </div>
                  </CalendarButton>
                  <CalendarButton
                    onClick={() => onClickDelete(balances, dayArray)}
                    disabled={thisMonth(dayArray)}
                    variant="deleteModal"
                  >
                    <TrashIcon className="h-3 w-5 inline-block " />
                  </CalendarButton>
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        <DayModal isOpen={editModalIsOpen} targetDay={targetDay} selectDay={selectDay} />
        <DeleteModal targetDay={targetDay} deleteModal={deleteModel} />
      </div>
    </div>
  );
});
