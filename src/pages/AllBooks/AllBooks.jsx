import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Shared/Spinner";
import BookCard from "../Shared/BookCard";
import { CategoryContext } from "../../contexts/CategoryContenxt";
import { Link, useSearchParams } from "react-router";
import { CiGrid41, CiViewTable } from "react-icons/ci";

const AllBooks = () => {
  const categories = useContext(CategoryContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const [selectedLayout, setSelectedLayout] = useState("grid");

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/books?category=${selectedCategory}`
        );
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [selectedCategory]);

  if (loading)
    return (
      <Spinner
        title="Loading Books..."
        description="Please wait while we fetch your library."
      />
    );

  return (
    <div className="px-4 py-6 bg-base-200 min-h-screen">
      {/* Filter/Search Bar */}
      <div className="flex justify-between items-center gap-4 mb-6">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedCategory(value);
            setSearchParams(value ? { category: value } : {});
          }}
          className="select select-bordered max-w-60"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Grid and Table Toggle Button */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={(e) =>
              setSelectedLayout(e.target.checked ? "grid" : "table")
            }
            checked={selectedLayout === "grid"}
          />
          <CiViewTable className="swap-on h-8 w-8 text-primary" />
          <CiGrid41 className="swap-off h-8 w-8 text-primary" />
        </label>
      </div>

      {/* Book Display */}
      {selectedLayout === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book._id} book={book} />)
          ) : (
            <p className="text-center text-sm text-base-content col-span-full">
              No books found matching your criteria.
            </p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>SL</th>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book, index) => (
                  <tr key={book._id}>
                    <td>{index + 1}</td>
                    <td>
                        <img src={book.image} className="w-16 h-16 rounded-full border-2 border-gray-500" alt="" />
                    </td>
                    <td>
                      <Link
                        className="underline text-primary hover:font-semibold"
                        to={`/all-books/${book._id}`}
                      >
                        {book.name}
                      </Link>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-sm text-base-content"
                  >
                    No books found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
