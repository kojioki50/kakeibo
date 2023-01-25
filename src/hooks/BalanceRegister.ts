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
  registerBalance: (day: string, plus: number, minus: number, val: string) => Promise<void>;
  registerLoad: boolean
};

export const BalanceRegister: function1 = () => {
  const { instance } = axiosInstance();
  const [registerLoad, setRegisterLoad] = useState(false);
  const { getBalance } = BalancesGet();
  const setEditModalIsOpen = useSetRecoilState(modalOpenState);
  const registerBalance = useCallback(
    async ( day: string, plus: number, minus: number, val: string) => {
      setRegisterLoad(true)
      await instance
        .post("api/lists", {
          day,
          plus,
          minus,
          val,
        })
        .then(async (response: AxiosResponse<balanceType[]>) => {
          await getBalance();
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setRegisterLoad(false);
          setEditModalIsOpen(false);
        });
    },
    []
  );
  return { registerBalance,registerLoad };
};
