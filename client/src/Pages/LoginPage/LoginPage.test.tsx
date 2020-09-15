import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "./LoginPage";
import "jest-styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../Style/styled-components/Theme";
import { BrowserRouter } from "react-router-dom";

it("Renders login page", () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </ThemeProvider>
  );

  const title = getByText("Log in to Twitter");
  expect(title).toBeInTheDocument();
});
