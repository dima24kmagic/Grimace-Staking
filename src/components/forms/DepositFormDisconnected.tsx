import styled from "@emotion/styled"
import Subheading from "./Subheading"
import { useConnectMetamask } from "@/app/hooks/useConnectMetamask"

const RootStyled = styled.div`
  width: 100%;
  padding: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 4px solid #E68C36;
`

const HeadingStyled = styled.h1`
  font-size: 4rem;
  font-weight: 300;

  & b {
    font-weight: 500;
  }
`

const ButtonStyled = styled.button`
  cursor: pointer;
  font: inherit;
  margin-top: 28px;
  font-size: 1.5rem;
  outline: none;
  border: none;
  border-radius: 15px;
  background: linear-gradient(270deg, #FFAA47 4.47%, #926015 100%);
  text-transform: uppercase;
  display: flex;
  place-items: center;
  padding: 12px 48px;
`

function DepositFormDisconnected() {
  const { handleConnect } = useConnectMetamask()
  
  return (
    <RootStyled>
      <HeadingStyled>
        STAKE
        {" "}
        <b>GRIMACE</b>
      </HeadingStyled>
      <Subheading>Protecting You from You</Subheading>
      <ButtonStyled onClick={handleConnect}>Connect</ButtonStyled>
    </RootStyled>
  )
}

export default DepositFormDisconnected
