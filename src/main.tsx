import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Personaliza tu tema aquí
});

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
