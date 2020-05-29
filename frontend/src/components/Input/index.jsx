import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.3rem;
  transition: all 1s ease-in;
  &:active {
    border: 1px solid ${(p) => p.theme.colors.primary};
    border-radius: 5px;
  }
  ::placeholder {
    color: ${(p) => p.theme.colors.primary}60;
  }
`;

export default Input;
