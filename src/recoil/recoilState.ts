import { atom } from "recoil";
import { balanceType } from "../types/type";


export const balancesState = atom<balanceType[]>({
  key: "BALANCES_STATE",
  default: [],
});

export const modalOpenState = atom<boolean>({
  key: "MODAL_OPEN",
  default: false,
});

export const modalDeleteState = atom<boolean>({
  key: "DELETE_MODAL",
  default: false,
});
