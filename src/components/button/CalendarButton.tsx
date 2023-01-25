/* eslint-disable react/display-name */
import { FC, memo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant: keyof typeof buttonStyle;
}

const buttonStyle = {
  openModal: "block  mt-2 mb-2 m-auto disabled:opacity-25",
  deleteModal: "block ml-auto pl-2 disabled:opacity-25",
} as const;

export const CalendarButton: FC<Props> = memo((props) => {
  const { children, onClick, variant, disabled = false } = props;
  return (
    <>
      <button className={`${buttonStyle[variant]}`} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </>
  );
});
