import React from "react";
import { Container } from "./style";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
export default function PickDate({ date, handlePrevDay, handleNextDay }) {
  return (
    <Container>
      <button onClick = {handlePrevDay}>
        <MdKeyboardArrowLeft size="4rem" />
      </button>
      <h2>{date}</h2>
      <button onClick = {handleNextDay}>
        <MdKeyboardArrowRight size="4rem" />
      </button>
    </Container>
  );
}
