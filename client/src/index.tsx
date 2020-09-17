import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./Style/styled-components/Theme";
import GlobalStyle from "./Style/styled-components/GlobalStyles";
import { RootStateProvider } from "./Store/RootStore";

ReactDOM.render(
  <React.StrictMode>
    <RootStateProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RootStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
