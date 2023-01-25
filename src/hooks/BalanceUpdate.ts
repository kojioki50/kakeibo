/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { axiosInstance } from "../lib/axios/axiosInstance";
import { modalOpenState } from "../recoil/recoilState";
import { balanceType } from "../types/type";
import { BalancesGet } from "./BalancesGet";

interface AxiosResponse<T> {
  data: T;
}

type function1 = () => {
  updateBalance: (id: number | undefined, day: string, plus: number, minus: number, val: string) => Promise<void>;
  updateLoad: boolean
}

export const BalanceUpdate: function1 = () => {
  const { instance } = axiosInstance();
  const [updateLoad, setUpdateLoad] = useState(false);
  const { getBalance } = BalancesGet();
  const setEditModalIsOpen = useSetRecoilState(modalOpenState);
  const updateBalance = useCallback(async (_id: number | undefined, day: string, plus: number, minus: number, val: string) => {
    setUpdateLoad(true);
    await instance
      .patch("api/lists" + "/" + _id, {
        day,
        plus,
        minus,
        val,
      })
      .then(async (response: AxiosResponse<balanceType[]>) => {
        console.log(response.data);
        await getBalance();
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setUpdateLoad(false);
        setEditModalIsOpen(false);
      });
  }, []);
  return { updateBalance,updateLoad };
};
