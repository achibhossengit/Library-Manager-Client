import React from "react";
import { NavLink } from "react-router";

const Links = () => {
  return (
    <>
      <li className="text-xs sm:text-sm">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-xs sm:text-sm">
        <NavLink to="/all-books">All Books</NavLink>
      </li>
      <li className="text-xs sm:text-sm">
        <NavLink to="/add-book">Add Book</NavLink>
      </li>
      <li className="text-xs sm:text-sm">
        <NavLink to="/borrowed-books">Borrowed Books</NavLink>
      </li>
      <li className="text-xs sm:text-sm">
        <NavLink to="/my-added-list">My Added List</NavLink>
      </li>
    </>
  );
};

export default Links;
