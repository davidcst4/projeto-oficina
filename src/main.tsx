import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { OficinaApp } from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OficinaApp />
  </StrictMode>
);
