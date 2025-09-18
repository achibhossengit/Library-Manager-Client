import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddBook from "../pages/AddBook/AddBook";
import PrivateRoute from "./PrivateRoute";
import AllBooks from "../pages/AllBooks/AllBooks";
import MyAddedList from "../pages/MyAddedList/MyAddedList";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "all-books", Component: AllBooks },
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <AddBook></AddBook>
          </PrivateRoute>
        ),
      },
      {
        path: "my-added-list",
        element: (
          <PrivateRoute>
            <MyAddedList></MyAddedList>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
