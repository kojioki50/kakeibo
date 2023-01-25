/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { AxiosResponse } from "axios";
import { useCallback, useState } from "react"
import { axiosInstance } from "../lib/axios/axiosInstance";
import { balanceType } from "../types/type";
import { BalancesGet } from "./BalancesGet";

type function1 = () => {
  deleteBalance: (_id: number | undefined) => Promise<void>;
  deleteLoad: boolean
}

export const BalanceDelete: function1 = () => {
  const { instance } = axiosInstance();
  const [deleteLoad, setDeleteLoad] = useState(false);
  const { getBalance } = BalancesGet();
  const deleteBalance = useCallback(async (_id: number | undefined) => {
    setDeleteLoad(true);
    await instance
      .delete("api/lists" + "/" + _id)
      .then(async (response: AxiosResponse<balanceType[]>) => {
        await getBalance();
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setDeleteLoad(false);
      });
  }, [])
  return {deleteBalance,deleteLoad}
}