import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/Route.jsx";
import  Helmet from 'react-helmet'

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <Helmet>
  <html className="h-full" />
  <body className="h-full dark:bg-DarkBad bg-lightsun hidden-scroll" />
</Helmet>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </>
);
