import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./router/Router.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import CategoryContextProvider from "./contexts/CategoryContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CategoryContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </CategoryContextProvider>
    </AuthProvider>
  </StrictMode>
);
