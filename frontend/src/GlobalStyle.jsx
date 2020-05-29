import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
    padding:0;
    margin:0;
    outline: none;
}
*{
    font-family: ${(p) => p.theme.fonts.title.name}
}
h1,h2,h3,h4,h5,h6{
    font-weight: bold;
}
#root{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
}
`;

export default GlobalStyle;
