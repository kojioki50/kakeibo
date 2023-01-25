import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { axiosInstance } from "../lib/axios/axiosInstance";
import { balancesState } from "../recoil/recoilState";
import { balanceType } from "../types/type";

interface AxiosResponse<T> {
  data: T;
}

type function1 = () => {
  getBalance:() => Promise<void>
}

type function2 = () => Promise<void>;


export const BalancesGet: function1 = () => {
  const { instance } = axiosInstance();
  const setBalances = useSetRecoilState<balanceType[]>(balancesState);
  const getBalance:function2 = useCallback(async () => {
    await instance
      .get("api/lists", {})
      .then((response: AxiosResponse<balanceType[]>) => {
        console.log(response.data);
        setBalances(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return { getBalance };
};
