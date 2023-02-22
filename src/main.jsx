import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import BoxContextWrapper from "./components/Voice Assistant/BoxContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BoxContextWrapper>
      <App />
    </BoxContextWrapper>
  </BrowserRouter>
);
