import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App.jsx";
import "./index.css";
import fontLoader from "./utils/fontLoader.js";

// Initialize font loading
fontLoader.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
