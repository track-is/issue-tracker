import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./context/StateProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";

import App from "./App.jsx";
import queryClient from "./api/reactQueryClient.js";
import "./index.css";

const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    "grape-1": [
      "#be4bdb",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
    "ocean-blue": [
      "#7AD1DD",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
    "bright-pink": [
      "#F0BBDD",
      "#ED9BCF",
      "#EC7CC3",
      "#ED5DB8",
      "#F13EAF",
      "#F71FA7",
      "#FF00A1",
      "#E00890",
      "#C50E82",
      "#AD1374",
    ],
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router basename="/">
      <StateProvider>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme}>
            <App />
          </MantineProvider>
        </QueryClientProvider>
      </StateProvider>
    </Router>
  </React.StrictMode>
);
