import styled from "styled-components";

export const Container = styled.main`
  grid-column-start: 2;
  grid-column-end: 11;
`;

export const AppointmentsContent = styled.section`
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`;


