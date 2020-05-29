import React, { useEffect, useState } from "react";
import PickDate from "../../components/PickDate";
import { Container, AppointmentsContent } from "./style";
import Appointment from "../../components/Appointment";
import { useSelector } from "react-redux";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { format, subDays, addDays } from "date-fns";
import { pt } from "date-fns/locale";

const range = [8,9,10,11,12,12,14,15,16,17,18,19,20]
export default function Appointments() {
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );
  const user = useSelector((s) => s.user);
  function handlePrevDay() {
    setDate(subDays(date, 1));
  }
  function handleNextDay() {
    setDate(addDays(date, 1));
  }
  useEffect(() => {
    async function getAppointments() {
      try {
        const response = await api.get("/service");

        console.log(response.data);
      } catch (error) {
        if (error.response) console.log(error);
        else console.log(error.message);
      }
    }

    getAppointments();
  }, [date]);
  return (
    <Container>
      <PickDate
        date={dateFormatted}
        handlePrevDay={handlePrevDay}
        handleNextDay={handleNextDay}
      />
      <AppointmentsContent>
        <Appointment
          time="19:00"
          clientInfo={{
            name: "Samuel Reis",
            services: ["Corte", "barba"],
            perfilImage: "https://i.pravatar.cc/40",
          }}
        />
        <Appointment />
        <Appointment />
        <Appointment pastTime />
      </AppointmentsContent>
    </Container>
  );
}
