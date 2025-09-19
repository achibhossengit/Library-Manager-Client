import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import Spinner from "../Shared/Spinner";
import toast from "react-hot-toast";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returningId, setReturningId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:3000/borrowed-list/books",
          {
            headers: { Authorization: user.accessToken },
          }
        );
        setBorrowedBooks(res.data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
        toast.error("Failed to load borrowed books");
      } finally {
        setLoading(false);
      }
    };

    if (user?.accessToken) fetchBorrowedBooks();
  }, [user]);

  console.log(borrowedBooks);

  const handleReturn = async (borrowedId) => {
    setReturningId(borrowedId);
    try {
      const res = await axios.delete(
        `http://localhost:3000/borrowed-list/return/${borrowedId}`,
        {
          headers: { Authorization: user.accessToken },
        }
      );
      if (res.data.deletedCount > 0) {
        toast.success("Book returned successfully");
        setBorrowedBooks((prev) => prev.filter((book) => book.borrowedId !== borrowedId));
      } else {
        toast.error("Failed to return book");
      }
    } catch (error) {
      console.error("Return error:", error);
      toast.error("Something went wrong");
    } finally {
      setReturningId(null);
    }
  };

  if (loading) return <Spinner title="Loading your borrowed books..." />;

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary text-center">
        My Borrowed Books
      </h2>
      {borrowedBooks.length === 0 ? (
        <p className="text-center text-base-content">
          You haven’t borrowed any books yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>SL</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book, index) => (
                <tr key={book.borrowedId}>
                  <td>{index + 1}</td>
                  <td
                    className="text-primary cursor-pointer hover:underline"
                    onClick={() => navigate(`/all-books/${book._id}`)}
                  >
                    {book.name}
                  </td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleReturn(book.borrowedId)}
                      disabled={returningId === book._id}
                    >
                      {returningId === book._id ? "Returning..." : "Return"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
