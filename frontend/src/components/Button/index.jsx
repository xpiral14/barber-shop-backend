import styled from "styled-components";
import { darken } from "polished";
const Button = styled.button`
  padding: 0.6rem;
  border: none;
  border-radius: 5px;
  background: ${(p) => (p.bg ? p.bg : p.theme.colors.primary)};
  color: ${(p) => (p.color ? p.color : p.theme.colors.quaternary)};
  cursor: pointer;
  transition: 0.3s;
  :hover {
    background: ${p => darken(.3, p.bg ? p.bg : p.theme.colors.primary)}
  }
`;

export default Button;
