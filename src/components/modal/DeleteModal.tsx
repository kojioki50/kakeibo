/* eslint-disable react/display-name */
import { FC, memo, useCallback } from "react"
import { useSetRecoilState } from "recoil";
import { BalanceDelete } from "../../hooks/BalanceDelete";
import { modalDeleteState } from "../../recoil/recoilState";
import { balanceType } from "../../types/type";
import Modal from "react-modal";
import { PrimaryButton } from "../button/PrimaryButton";
import { Spin } from "../element/Spin";

interface Props {
  targetDay: balanceType | null;
  deleteModal: boolean;
}

export const DeleteModal: FC<Props> = memo((props) => {
  const { targetDay, deleteModal } = props;
  const setDeleteModal = useSetRecoilState(modalDeleteState);
  const { deleteBalance,deleteLoad } = BalanceDelete();

  const onClickDelete = useCallback((_id: number | undefined): void => {
    (async () => {
      await deleteBalance(_id);
    })().catch((e) => {
      console.log(e)
    })
    
    console.log(_id)
    setDeleteModal(false);
  },[])
  
  return (
    <>
      <Modal
        className="h-auto w-auto absolute left-1/3 bg-gray-100 animate-slide-in-elliptic-top-fwd"
        isOpen={deleteModal}
      >
        <div>
          <h1 className="text-center font-bold mt-12 mx-20">本当に削除しますか</h1>
          <div className="mb-8 mr-5 flex justify-center">
            <PrimaryButton disabled={deleteLoad} onClick={() => onClickDelete(targetDay?._id)}>
              {deleteLoad ? <Spin /> : <span>delete</span>}
            </PrimaryButton>
            <PrimaryButton disabled={deleteLoad} onClick={() => setDeleteModal(false)}>
              <span>back</span>
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </>
  );
})