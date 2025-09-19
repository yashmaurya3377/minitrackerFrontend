// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
