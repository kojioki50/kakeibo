/* eslint-disable react/display-name */
import { FC, memo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  // disabled?: boolean;
  // variant: keyof typeof buttonStyle;
}

// const buttonStyle = {
//   reset: "border rounded ml-2 py-2 px-4",
//   prev: "block ml-auto pl-2 disabled:opacity-25",
//   next: "block ml-auto pl-2 disabled:opacity-25",
// } as const;

export const HeaderButton: FC<Props> = memo((props) => {
  const { children, onClick } = props;
  return (
    <>
      <button onClick={onClick}>
        {children}
      </button>
    </>
  );
});
