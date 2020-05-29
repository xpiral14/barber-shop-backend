import React from "react";
import { Container } from "./style";
import Header from "../../components/Header";
import PickDate from "../../components/PickDate";
import { Switch, Route } from "react-router-dom";
import Appointments from "../Appointments";

export default function Aunteticated({match}) {
  console.log(match.url)
  return (
    <>
      <Container>
        <Header />
        <Appointments />
      </Container>
    </>
  );
}
