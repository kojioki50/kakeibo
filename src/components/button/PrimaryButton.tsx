/* eslint-disable react/display-name */
import { FC, memo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const PrimaryButton: FC<Props> = memo((props) => {
  const { children, onClick, disabled = false} = props;
  return (
    <>
      <button
        className="inline-block w-20 ml-8 mt-10 p-2 bg-white"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
});