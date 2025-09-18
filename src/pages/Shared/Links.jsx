import React from "react";
import { Link } from "react-router";

const Links = () => {
  return (
    <>
      <li className="text-xs sm:text-sm">
        <Link to="/">Home</Link>
      </li>
      <li className="text-xs sm:text-sm">
        <Link to="/all-books">All Books</Link>
      </li>
      <li className="text-xs sm:text-sm">
        <Link to="/add-book">Add Book</Link>
      </li>
      <li className="text-xs sm:text-sm">
        <Link to="/borrowed-books">Borrowed Books</Link>
      </li>
      <li className="text-xs sm:text-sm">
        <Link to="/my-added-list">My Added List</Link>
      </li>
    </>
  );
};

export default Links;
