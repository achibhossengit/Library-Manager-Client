import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../Shared/Spinner";
import BookDetails from "../Shared/BookDetails";

const MyAddedList = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (!user?.email || !user?.accessToken) return;

    axios
      .get(`http://localhost:3000/books/${user.email}`, {
        headers: {
          Authorization: user.accessToken,
        },
      })
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load books");
        setLoading(false);
      });
  }, [user]);

  if (loading) return <Spinner title="Loading your books..." />;

  return (
    <div className="px-4 py-6 bg-base-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-primary">My Added Books</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Author</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td
                  className="text-primary cursor-pointer hover:underline"
                  onClick={() => setSelectedBook(book)}
                >
                  {book.name}
                </td>
                <td>{book.quantity}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          setSelectedBook={setSelectedBook}
          setBooks={setBooks}
          onClose={() => setSelectedBook(null)}
          show_action={true}
        />
      )}
    </div>
  );
};

export default MyAddedList;
