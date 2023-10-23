import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "@emotion/styled";
import { css } from "@emotion/css";

export type CountdownBoxProps = {
  text: string;
  fontSize: number;
};

function CountdownBox({ text, fontSize }: CountdownBoxProps) {
  const [textTop, setTextTop] = useState(text);
  const [textBottom, setTextBottom] = useState("");
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const nodeRef = useRef(null);

  const triggerSwitch = () => setIsSwitching(!isSwitching);

  useEffect(triggerSwitch, [text]);

  const handleEnd = () => {
    setTextTop(textBottom);
    setTextBottom(text);
  };

  return (
    <CSSTransition
      classNames={{
        enter: boxStyleEnter,
        enterActive: boxStyleEnterActive,
        enterDone: boxStyleEnterDone,
        exit: boxStyleEnter,
        exitActive: boxStyleEnterActive,
        exitDone: boxStyleEnterDone,
      }}
      timeout={500}
      in={isSwitching}
      onEnter={handleEnd}
      onExit={handleEnd}
      nodeRef={nodeRef}
    >
      <Box fontSize={fontSize} ref={nodeRef}>
        <Char fontSize={fontSize} className="text-top">
          {textTop}
        </Char>
        <Char fontSize={fontSize} className="text-bottom">
          {textBottom}
        </Char>
      </Box>
    </CSSTransition>
  );
}

const Box = styled.div`
  width: ${({ fontSize }) => (fontSize / 4) * 3 + "px"};
  height: ${({ fontSize }) => fontSize + "px"};
  font-size: ${({ fontSize }) => fontSize + "px"};
  position: relative;
  border-radius: 10px;
  background-color: var(--color-white);
  color: var(--color-dark);
  overflow: hidden;

  @media (max-width: 768px) {
    width: ${({ fontSize }) => fontSize / 2 + "px"};
    height: ${({ fontSize }) => (fontSize / 4) * 3 + "px"};
    font-size: ${({ fontSize }) => (fontSize / 4) * 3 + "px"};
    border-radius: 8px;
  }
`;

const boxStyleEnter = css`
  & .text-top {
    transform: translateY(0);
  }

  & .text-bottom {
    transform: translateY(100%);
  }
`;
const boxStyleEnterActive = css`
  & .text-top {
    transform: translateY(-100%);
    transition: transform 500ms ease-in-out;
  }

  & .text-bottom {
    transform: translateY(0);
    transition: transform 500ms ease-in-out;
  }
`;
const boxStyleEnterDone = css`
  & .text-top {
    transform: translateY(100%);
  }

  & .text-bottom {
    transform: translateY(0);
  }
`;

const Char = styled.span`
  position: absolute;
  width: ${({ fontSize }) => (fontSize / 4) * 3 + "px"};
  height: ${({ fontSize }) => fontSize + "px"};
  text-align: center;
  vertical-align: middle;
  line-height: 1;
  left: 0;
  top: 0;

  @media (max-width: 768px) {
    width: ${({ fontSize }) => fontSize / 2 + "px"};
    height: ${({ fontSize }) => (fontSize * 4) / 3 + "px"};
  }
`;

export default CountdownBox;
