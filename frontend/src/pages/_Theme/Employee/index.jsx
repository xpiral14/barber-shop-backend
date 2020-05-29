import React from "react";
import Header from "../../../components/Header";
import { Container } from "./style";
import { Content } from "./style";

export default function EmployeeTheme({ children }) {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
    </Container>
  );
}
