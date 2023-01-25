/* eslint-disable react/display-name */
import { FC, memo } from "react";



export const Spin: FC = memo(() => {
  return (
    <>
      <span className="inline-block animate-spin h-4 w-4 border-4 border-blue-500 rounded-full border-r-transparent"></span>
    </>
  );
});
