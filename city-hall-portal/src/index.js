// src/index.js
// LEGACY: ReactDOM.render — deprecated in React 18.
// Migration target: import { createRoot } from 'react-dom/client'; createRoot(el).render(<App />)
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
