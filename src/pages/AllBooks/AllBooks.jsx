import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Shared/Spinner";
import BookCard from "../Shared/BookCard";
import { useNavigate, useSearchParams } from "react-router";
import { FaSearch } from "react-icons/fa";

const AllBooks = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get("category");
  const availability = searchParams.get("availability");

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState(category || "");
  const [availabilityFilter, setAvailabilityFilter] = useState(
    availability || ""
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (categoryFilter) params.set("category", categoryFilter);
    if (availabilityFilter) params.set("availability", availabilityFilter);
    navigate(`?${params.toString()}`);
  }, [categoryFilter, availabilityFilter, navigate]);

  // Fetch books
  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        setBooks(res.data);
        setFilteredBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...books];

    if (categoryFilter) {
      filtered = filtered.filter((book) => book.category === categoryFilter);
    }

    if (availabilityFilter === "available") {
      filtered = filtered.filter((book) => parseInt(book.quantity) > 0);
    } else if (availabilityFilter === "unavailable") {
      filtered = filtered.filter((book) => parseInt(book.quantity) === 0);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.name.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
      );
    }

    setFilteredBooks(filtered);
  }, [categoryFilter, availabilityFilter, searchTerm, books]);

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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Category Filter */}
        <select
          className="select select-bordered w-full md:w-1/3"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Novel">Novel</option>
          <option value="Thriller">Thriller</option>
          <option value="History">History</option>
          <option value="Drama">Drama</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>

        {/* Search Input */}
        <div className="join">
          <div>
            <label className="input join-item">
              <FaSearch></FaSearch>
              <input
                type="text"
                placeholder="Search by title or author"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />{" "}
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          <button className="btn btn-neutral join-item">Join</button>
        </div>

        {/* Availability Filter */}
        <select
          className="select select-bordered w-full md:w-1/3"
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="">All Availability</option>
          <option value="available">Available</option>
          <option value="unavailable">Out of Stock</option>
        </select>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p className="text-center text-sm text-base-content col-span-full">
            No books found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
