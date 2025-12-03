import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/DarkModeContext";
import { ManagmentContextProvider } from "./context/ManagmentContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ManagmentContextProvider>
   <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
</DarkModeContextProvider>
</ManagmentContextProvider>
  </StrictMode>
);
