import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { BorrowedListContext } from "./BorrowedListContext";

const BorrowedListProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [borrowedLoading, setBorrowedLoading] = useState(false);
  const [myBorrowedList, setMyBorrowedList] = useState([]);
  useEffect(() => {
    const fetchBorrowedList = async () => {
      setBorrowedLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/borrowed-list/ids`, {
          headers: { Authorization: user.accessToken },
        });
        setMyBorrowedList(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setBorrowedLoading(false);
      }
    };

    if (user) fetchBorrowedList();
  }, [user]);

  return (
    <BorrowedListContext value={{ myBorrowedList, borrowedLoading }}>
      {children}
    </BorrowedListContext>
  );
};

export default BorrowedListProvider;
