import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/DarkModeContext";
import { ManagmentContextProvider } from "./context/ManagmentContext";
import TransactionContextProvider from "./context/TransactionContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TransactionContextProvider>
    <ManagmentContextProvider>
   <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
</DarkModeContextProvider>
</ManagmentContextProvider>
</TransactionContextProvider>
  </StrictMode>
);
