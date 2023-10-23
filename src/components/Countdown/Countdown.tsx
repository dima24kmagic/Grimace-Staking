import { HTMLAttributes } from "react";
import styled from "@emotion/styled";
import CountdownBox from "@/components/Countdown/CountdownBox";

export type CountdownProps = HTMLAttributes<HTMLDivElement> & {
  num1: number | string;
  num2: number | string;
  num3: number | string;
  label1: string;
  label2: string;
  label3: string;
  gap: number;
  fontSize: number;
};

const CountdownBoxRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CountdownTimeWrapper = styled.div`
  display: flex;
  div:first-child {
    margin-right: ${({ fontSize }) => fontSize / 10 + "px"};
  }
`;

const CountDownBoxWrapper = ({ text1, text2, label, fontSize }) => {
  return (
    <CountdownBoxRoot>
      <CountdownTimeWrapper fontSize={fontSize}>
        <CountdownBox fontSize={fontSize} text={text1} />
        <CountdownBox fontSize={fontSize} text={text2} />
      </CountdownTimeWrapper>
      <div>{label}</div>
    </CountdownBoxRoot>
  );
};

function Countdown({
  num1,
  num2,
  num3,
  label1,
  label2,
  label3,
  gap,
  fontSize,
  ...rest
}: CountdownProps) {
  return (
    <Root gap={gap} {...rest}>
      <CountDownBoxWrapper
        fontSize={fontSize}
        // text1={num1?.split(".")[0]}
        // text2={num1?.split(".")[1]}
        text2={(num1 % 10).toString()}
        text1={(Math.floor(num1 / 10) % 10).toString()}
        label={label1}
      />
      <Separator fontSize={fontSize}>:</Separator>
      <CountDownBoxWrapper
        fontSize={fontSize}
        // text1={num2?.split(".")[0]}
        // text2={num2?.split(".")[1]}
        text2={(num2 % 10).toString()}
        text1={(Math.floor(num2 / 10) % 10).toString()}
        label={label2}
      />
      <Separator fontSize={fontSize}>:</Separator>
      <CountDownBoxWrapper
        fontSize={fontSize}
        // text1={num3?.split(".")[0]}
        // text2={num3?.split(".")[1]}
        text2={(num3 % 10).toString()}
        text1={(Math.floor(num3 / 10) % 10).toString()}
        label={label3}
      />
      {/*<CountdownBoxRoot>
        <CountdownTimeWrapper>
          <CountdownBox text={(Math.floor(num1 / 10) % 10).toString()} />
          <CountdownBox text={(num1 % 10).toString()} />
        </CountdownTimeWrapper>
        <div>Days</div>
      </CountdownBoxRoot>*/}
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  gap: ${({ gap }) => gap + "px"};
  align-items: center;
  user-select: none;

  @media (max-width: 768px) {
    gap: ${({ gap }) => gap / 2 + "px"};
  }
`;

const Separator = styled.span`
  font-size: ${({ fontSize }) => fontSize + "px"};
  line-height: 1;
  transform: translateY(-25%); // Font line height fix

  @media (max-width: 768px) {
    font-size: ${({ fontSize }) => (fontSize / 4) * 3 + "px"};
  }
`;

export default Countdown;
