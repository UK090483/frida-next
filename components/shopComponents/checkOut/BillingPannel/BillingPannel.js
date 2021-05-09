import React, { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import Form from "./Form"
import UiContext from "~context/UiContext"
import Summary from "./Summary"
import PPP from "../ppp"
import { Akkordion, AkkordionItem } from "../../Akkorion/Akkordion"
export default function BillingPannel({ artikel, nextStep, back }) {
  const [isFormValid, setIsFormValid] = useState(false)

  const [currentlyActive, SetCurrentlyActive] = useState("p1")

  const onChange = name => {
    SetCurrentlyActive(name)
  }

  return (
    <Root>
      {/* <Box>
        <Summary artikel={artikel}></Summary>
      </Box> */}

      <Akkordion>
        <AkkordionItem
          active={currentlyActive === "p1"}
          name={"p1"}
          onChange={onChange}
          label={"Daten"}
        >
          <Form
            isFormValid={isFormValid}
            setIsFormValid={setIsFormValid}
          ></Form>
        </AkkordionItem>
        <AkkordionItem
          active={currentlyActive === "p2"}
          name={"p2"}
          onChange={onChange}
          label={"Bezahlung"}
        >
          <h5>Item2</h5>
        </AkkordionItem>
        <AkkordionItem
          active={currentlyActive === "p3"}
          name={"p3"}
          onChange={onChange}
          label={"Abschliessen"}
        >
          <h5>Item3</h5>
        </AkkordionItem>
      </Akkordion>
      {/* <Box>
       
        <Form isFormValid={isFormValid} setIsFormValid={setIsFormValid}></Form>
      </Box> */}
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-bottom: 100px;

  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
    padding: 0 7%;
  }
`
const Box = styled.div`
  width: 100%;

  @media ${({ theme }) => theme.device.tablet} {
    width: 50%;
    padding: 0 20px;
  }
`
