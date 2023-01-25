/* eslint-disable react/display-name */
import React, { ChangeEventHandler, FC, memo, useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { useSetRecoilState } from "recoil";
import { modalOpenState } from "../../recoil/recoilState";
import { balanceType } from "../../types/type";
import {BalanceUpdate} from "../../hooks/BalanceUpdate"
import { BalanceRegister } from "../../hooks/BalanceRegister";
import { PrimaryButton } from "../button/PrimaryButton";
import { Spin } from "../element/Spin";


interface Props {
  isOpen: boolean;
  selectDay: string
  targetDay: balanceType | null;
}

Modal.setAppElement("#root");

export const DayModal: FC<Props> = memo((props) => {
  const { isOpen, selectDay,targetDay } = props;
  const [plus, setPlus] = useState<any>();
  const [minus, setMinus] = useState<any>();
  const [val, setVal] = useState<any>()
  const [day, setDay] = useState<any>();
  const setEditModalIsOpen = useSetRecoilState(modalOpenState);
  const { updateBalance,updateLoad } = BalanceUpdate();
  const { registerBalance,registerLoad } = BalanceRegister();
  const onClickClose = useCallback((): void => {
    setEditModalIsOpen(false);
  }, []);

  const onClickUpdate = useCallback(
    (
    id: number | undefined,
    day: string,
    plus: any,
    minus: any,
    val: string
    ) => {
      (async () => {
        await updateBalance(id ,day, plus, minus, val)
      })()
      .catch((e) => {
        console.log(e);
      });
  },[])
  const onClickRegister = useCallback(
    (
    day: string,
    plus: any,
    minus: any,
    val: string
    ) => {
      (async () => {
        await registerBalance(day, plus, minus, val)
      })()
      .catch((e) => {
        console.log(e);
      });
    }, [])

  const onChangePlus: ChangeEventHandler<HTMLInputElement> = (e:any) =>
    setPlus(e.target.value);
  
  const onChangeMinus: ChangeEventHandler<HTMLInputElement> = (e:any) =>
    setMinus(e.target.value);
  
  const onChangeVal: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setVal(e.target.value);

  useEffect(() => {
    setDay(selectDay);
    setPlus(targetDay?.plus ?? "");
    setMinus(targetDay?.minus ?? "");
    setVal(targetDay?.val ?? "")
  }, [targetDay, selectDay])
  


  return (
    <>
      <Modal className="h-auto w-auto top-15%  animate-swirl-in-top-bck" id="modal" isOpen={isOpen}>
        <div className="px-10 py-8 bg-gray-100 absolute left-1/2 -translate-x-1/2 ">
          <label className="block p-2 text-blue-600 " htmlFor="income">
            収入
            <input className="ml-2 mr-2" value={plus} onChange={onChangePlus} name="income" type="number" />
            <span className="text-black">円</span>
          </label>
          <label className="block p-2 mt-3 text-red-600" htmlFor="outlay">
            支出
            <input className="ml-2 mr-2" value={minus} name="outlay" onChange={onChangeMinus} type="number" />
            <span className="text-black">円</span>
          </label>
          <div>
            <p className="ml-2 mt-5 text-green-600">備考</p>
            <textarea className="ml-12 mt-2" value={val} onChange={onChangeVal} />
          </div>
          {targetDay === null ? (
            <PrimaryButton disabled={registerLoad} onClick={() => onClickRegister(day, plus, minus, val)}>
              {registerLoad ? <Spin /> : <span>register</span>}
            </PrimaryButton>
          ) : (
            <PrimaryButton disabled={updateLoad} onClick={() => onClickUpdate(targetDay?._id, day, plus, minus, val)}>
              {updateLoad ? <Spin /> : <span>update</span>}
            </PrimaryButton>
          )}

          <PrimaryButton disabled={updateLoad || registerLoad} onClick={onClickClose}>
            <span>cancel</span>
          </PrimaryButton>
        </div>
      </Modal>
    </>
  );
})