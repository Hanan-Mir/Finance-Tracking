import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/DarkModeContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
   <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
</DarkModeContextProvider>
  </StrictMode>
);
