import React, { useEffect, useState } from "react";
import { CategoryContext } from "./CategoryContenxt";
import axios from "axios";

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://library-manager-server-ivory.vercel.app/categories");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  return <CategoryContext value={categories}>{children}</CategoryContext>;
};

export default CategoryContextProvider;
