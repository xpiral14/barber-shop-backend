import React from "react";
import { Container } from "./style";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
export default function PickDate() {
  return (
    <Container>
      <MdKeyboardArrowLeft size="4rem" /> 
      <h2>8 de Julho</h2>
      <MdKeyboardArrowRight size="4rem" />
    </Container>
  );
}
