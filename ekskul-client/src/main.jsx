import React from "react";
import { createRoot } from "react-dom";
import "./index.css";
import Helmet from "react-helmet";
import { AuthProvider } from "./context/AuthContext.jsx";
import AppRouter from "./routes/Route.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <Helmet>
      <html className="h-full" />
      <body className="h-full dark:bg-DarkBad bg-lightsun hidden-scroll custom-cursor" />
    </Helmet>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </>
);
