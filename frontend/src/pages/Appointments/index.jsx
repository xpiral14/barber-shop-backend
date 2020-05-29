import React from "react";
import PickDate from "../../components/PickDate";
import { Container, AppointmentsContent } from "./style";
import Appointment from "../../components/Appointment";

export default function Appointments() {
  return (
    <Container>
      <PickDate />
      <AppointmentsContent>
        <Appointment time="19:00" clientInfo = {{
          name: "Samuel Reis",
          services: ["Corte", "barba"]
        }}/>
        <Appointment />
        <Appointment />
        <Appointment pastTime />
      </AppointmentsContent>
    </Container>
  );
}
