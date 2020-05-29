import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  margin-top: 40px;
  padding: 12px 16px;
  background: ${(p) => p.theme.colors.primary};
  border-radius: ${(p) => p.theme.borderRadius};
  display: flex;
`;

export const InfoContent = styled.section`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const UserContent = styled.section`
  color: ${(p) => p.theme.colors.secondary};
  p {
    line-height: 0.7rem;
  }
`;
export const ImageContent = styled.section`
  margin-left: 1rem;
  img {
    border-radius: 1.5rem;
  }
`;
