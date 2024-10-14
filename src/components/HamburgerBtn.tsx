import React from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerBtn = ({ open, setOpen }: Props) => {
  return (
    <button
      className='relative cursor-pointer w-8 h-8 z-10 pointer-events-auto'
      onClick={() => setOpen((prev: boolean) => !prev)}
      aria-label='Navigation menu toggle'
      aria-expanded={open}
    >
      <div
        className={`rounded h-1 w-7 top-4  bg-black before:bg-black after:bg-black dark:bg-white dark:before:bg-white dark:after:bg-white absolute -mt-0.5 transition-all duration-700 before:content-[''] before:w-7 before:h-1 before:rounded before:absolute before:duration-700 before:transition-all before:-translate-x-3.5  after:w-7 after:rounded after:h-1 after:absolute after:duration-700 after:transition-all after:-translate-x-3.5 
    ${
      open
        ? "bg-transparent dark:bg-transparent before:translate-y-0 before:rotate-45 after:translate-y-0 after:-rotate-45"
        : `before:-translate-y-2.5 after:translate-y-2.5`
    } 
    }`}
      ></div>
    </button>
  );
};

export default HamburgerBtn;
