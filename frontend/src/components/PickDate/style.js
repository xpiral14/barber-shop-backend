import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  font-size: ${p => p.theme.fonts.sizes.medium};
  margin: 0 auto;

  button{
    border: 0;
    cursor: pointer;
  }
`;
