import React from "react";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const UpDownButton = ({onMoveUp, onMoveDown}) => {

  return (
    <>
      <div className="rounded-l-md flex h-full flex-col border bg-white">
        <button className="p-1 h-full transition-all hover:bg-slate-100"
         onClick={onMoveUp}
        >
          <FaAngleUp />
        </button>
        <button className="p-1 h-full transition-all hover:bg-slate-100"
         onClick={onMoveDown}
        >
          <FaAngleDown />
        </button>
      </div>
    </>
  );
};

export default UpDownButton;
