import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import GroupDetail from "./components/GroupDetail";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "groups",
    element: <App />,
  },
  {
    path: "details",
    element: <GroupDetail />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
