import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#3C4456",
    secondary: "#ECC417",
    tertiary: "#95989F",
    quaternary: "#F4F5F7",
  },
  fonts: {
    title: {
      name: "Poppins",
      weight: "bold",
    },
    text: {
      name: "Poppins",
      weight: "normal",
    },
    sizes: {
      small: "1em",
      medium: "1.5em",
      large: "2em",
    },
  },

  borderRadius: "7px",
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
