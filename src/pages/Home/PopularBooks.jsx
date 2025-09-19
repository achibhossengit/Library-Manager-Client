import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Shared/Spinner";
import BookCard from "../Shared/BookCard";
import { Link } from "react-router";

const PopularBooks = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/books/popular");
        setPopularBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch popular books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularBooks();
  }, []);

  if (loading) {
    return (
      <Spinner
        title="Loading Popular Books..."
        description="Please wait while we fetch the most borrowed titles."
      />
    );
  }

  return (
    <div className="py-10 bg-base-200">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl font-bold text-primary mb-2">
          🔥 Most Popular Books
        </h2>
        <p className="text-base-content text-md max-w-xl mx-auto">
          These books are flying off the shelves. See what everyone’s reading
          right now.
        </p>
      </div>

      {/* Book Grid */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-10 text-center">
        <Link to="/all-books">
          <button className="btn btn-primary btn-outline">
            View All Books
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularBooks;
