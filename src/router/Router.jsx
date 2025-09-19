import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddBook from "../pages/AddBook/AddBook";
import PrivateRoute from "./PrivateRoute";
import AllBooks from "../pages/AllBooks/AllBooks";
import MyAddedList from "../pages/MyAddedList/MyAddedList";
import NotFound from "../pages/NotFound/NotFound";
import BookDetails from "../pages/BookDetails/BookDetails";
import axios from "axios";
import Spinner from "../pages/Shared/Spinner";
import BorrowedListProvider from "../contexts/BorrowedListProvider";
import MyBorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";

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
        path: "all-books/:book_id",
        element: (
          <PrivateRoute>
            <BorrowedListProvider>
              <BookDetails></BookDetails>
            </BorrowedListProvider>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Spinner></Spinner>,
        loader: ({ params }) =>
          axios
            .get(`https://library-manager-server-ivory.vercel.app/books/${params.book_id}`)
            .then((res) => res.data),
      },
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
      {
        path: "borrowed-books",
        element: (
          <PrivateRoute>
            <MyBorrowedBooks></MyBorrowedBooks>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", Component: NotFound },
]);

export default router;
