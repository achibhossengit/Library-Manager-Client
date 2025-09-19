import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import defaultBookImg from "../../assets/defaultBook.png";
import { BorrowedListContext } from "../../contexts/BorrowedListContext";
import { useLoaderData } from "react-router";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);
  const { myBorrowedList } = useContext(BorrowedListContext);
  const [loadingAction, setLoadingAction] = useState(false);

  const isAvailable = parseInt(book.quantity) > 0;
  const isAlreadyBorrowed = myBorrowedList?.includes(book._id);

  const handleBorrowBook = async () => {
    setLoadingAction(true);
    try {
      const res = await axios.post(
        "https://library-manager-server-ivory.vercel.app/borrowed-list",
        { bookId: book._id },
        { headers: { Authorization: user.accessToken } }
      );
      if (res.data.insertedId) {
        toast.success("Borrowed Successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-6xl mx-auto mt-20 bg-base-100 shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Book Image */}
        <div className="border flex justify-center items-center rounded-lg overflow-hidden animate-fade-in">
          <img
            src={book.image || defaultBookImg}
            alt={book.name}
            className="object-cover max-w-60 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right: Book Info */}
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-primary">{book.name}</h2>
            <p className="text-base-content">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="text-base-content">
              <strong>Category:</strong> {book.category}
            </p>
            <p className="text-base-content">
              <strong>Quantity Available:</strong> {book.quantity}
            </p>
            <p className="text-base-content">
              <strong>Borrowed Count:</strong> {book.borrowedCount}
            </p>
            <p className="text-base-content">
              <strong>Description:</strong> {book.description}
            </p>
            <p
              className={`font-semibold ${
                isAvailable ? "text-success" : "text-error"
              }`}
            ></p>
          </div>

          {/* Bottom Right: Borrow Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleBorrowBook}
              className="btn btn-primary"
              disabled={!isAvailable || loadingAction || isAlreadyBorrowed}
            >
              {loadingAction
                ? "Processing..."
                : isAlreadyBorrowed
                ? "Already Borrowed"
                : "📚 Borrow This Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
