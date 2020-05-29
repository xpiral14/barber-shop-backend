import styled from "styled-components";

export const Container = styled.section`
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 5px 5px #00000025;
  background: ${(p) => p.theme.colors.primary};
  & > div:first-child {
    display: flex;
    justify-content: space-between;
    p {
      color: ${(p) => p.theme.colors.quaternary};
    }
    h2 {
      color: ${(p) => p.theme.colors.secondary};
      font-size: ${(p) => p.theme.fonts.sizes.large};
    }
  }
  & > div:last-child {
    display: flex;
  }
`;

export const ClientInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    margin-left: 1rem;
    width: 40px;
    height: 40px;
    border-radius: 1.5rem;
  }
`;

export const ServiceType = styled.section`
  border-radius: 0.5rem;
  border-radius: 5px;
  width: inherit;
  min-width: 0.3rem;
  max-width: 30%;
  border: 2px solid ${(p) => p.theme.colors.quaternary};
  text-align: center;
  color: ${(p) => p.theme.colors.quaternary};
  padding: 0.5rem;
  margin-right: 0.8rem;
`;

export const Overlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  position: absolute;
  height: 100%;
  padding: 10px;
  background: ${(p) => p.theme.colors.primary}80;
`;

export const Available = styled.p``;
