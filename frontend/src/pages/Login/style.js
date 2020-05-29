import styled from "styled-components";

export const Container = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    input {
      margin-bottom: 1rem;
    }
  }
  grid-column-start: 6;
  grid-column-end: 8;
  margin: 0 auto;
`;
