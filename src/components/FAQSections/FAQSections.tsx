"use client";

import { MouseEvent, useState } from "react";
import styles from "./FAQSections.module.scss";
import Link from "next/link";
import clsx from "clsx";

const nftMarketplaceFAQ = [
  {
    question: "Why?",
    Answer:
      "To prevent you from the worst sin to imagine - selling GRIMACE!",
  },
  {
    question: "How it works?",
    Answer:
      "You can stake your GRIMACE to put them in good hands, so no shaking hands will lose them for you.",
  },
  {
    question: "EWP",
    Answer:
      "Early withdrawal penalty - You will feel the wrath of the apostles and suffer a loss of 66% of your deposit.",
  },
  {
    question: "How to add GRIMACE token to MetaMask?",
    Answer: (
      <>
        Once you connected your metamask and choose DogeChain network, in
        Metamask click on "Import Tokens", in Token Contract Address paste{" "}
        <p style={{display:"inline-block",margin:"0"}}>"0x2f90907</p>
        <p style={{display:"inline-block",margin:"0"}}>fD1DC1B7a</p>
        <p style={{display:"inline-block",margin:"0"}}>484b6f31D</p>
        <p style={{display:"inline-block",margin:"0"}}>df012328</p>
        <p style={{display:"inline-block",margin:"0"}}>c2baB28"</p> (token contract address) and
        you will see GRIMACE in Token Symbol automatically
      </>
    ),
  },
  
];

const FAQSections = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenSection = () => {
    setIsOpen(true);
  };
  const handleCloseSection = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [active, setActive] = useState(true);

  return (
    <>
      <div className={clsx("uppercase transition-colors hover:text-purple cursor-pointer")} onClick={handleOpenSection}>
        FAQ
      </div>
      {isOpen && (
        <div
          style={{ zIndex: 1000 }}
          className={styles.wrapper}
          onClick={handleCloseSection}
        >
          <div className={styles.faqBox}>
            <div>
              {nftMarketplaceFAQ.map((faq, index) => {
                return (
                  <div
                    key={index}
                    className={
                      activeQuestion === index && active
                        ? `${styles.questionBoxElongate}`
                        : `${styles.questionBox}`
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveQuestion(index);
                      setActive(true);
                    }}
                  >
                    <p>{faq.question}</p>
                  </div>
                );
              })}
            </div>
            {nftMarketplaceFAQ.map((faq, index) => {
              if (activeQuestion === index && active) {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveQuestion(index);
                      setActive(true);
                    }}
                    className={styles.answerBox}
                  >
                    <p>{faq.Answer}</p>
                  </div>
                );
              }
              return "";
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default FAQSections;
