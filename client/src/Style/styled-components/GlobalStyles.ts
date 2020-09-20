import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

    }
    html, body { 
        width: 100%;
        height: 100%;
    }
    
    body {
        background-color: ${(props) => props.theme.colors.primary}
    }
`;
export default GlobalStyle;
