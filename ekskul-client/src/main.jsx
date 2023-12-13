import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/Route.jsx";
import Helmet from "react-helmet";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
// import { CustomCursorProvider } from 'react-custom-cursor';
// import AnimatedCursor from 'react-custom-cursor/AnimatedCursor';

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Helmet>
      <html className="h-full" />
      <body className="h-full dark:bg-DarkBad bg-lightsun hidden-scroll custom-cursor" />
    </Helmet>
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
      </ProfileProvider>
    </AuthProvider>
  </>
);
