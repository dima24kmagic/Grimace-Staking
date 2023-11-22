"use client";

import { MouseEvent, useEffect, useState } from "react";
import {
  answerBox,
  faqBox,
  FAQButtonWrapper,
  questionBox,
  questionBoxElongate,
  wrapper,
} from "./EarlyUnstakeAlert.module.scss";
import Link from "next/link";
import Button from "../Button";
import UnlockIcon from "../icons/UnlockIcon";

const EarlyUnstakeAlert = ({isOpenProp, handleWithdraw, handleClose}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);

  useEffect(() => {
    setIsOpen(isOpenProp)
  }, [isOpenProp])

  return (
    <>
      {isOpen && (
        <div style={{zIndex: 1000}} className={wrapper} onClick={handleClose}>
          <div className={faqBox}>
            <div className="p-10 m-10 text-[24px]" style={{background: '#1b1c27', borderRadius: '0.75rem'}}>
              Early withdrawal will result in a loss of 66%, are you sure?
            </div>
            <Button onClick={handleWithdraw} className="m-10 mt-0 flex items-center gap-2 justify-center self-center from-danger-800 to-danger-500">
              <UnlockIcon className="text-[24px]" />
              Early unstake
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default EarlyUnstakeAlert;
