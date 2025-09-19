import { Link } from "react-router";
import defaultBookImg from "../../assets/defaultBook.png";

const BookCard = ({ book }) => {
  const { _id, image, name, author, quantity } = book;
  const isAvailable = parseInt(quantity) > 0;

  return (
    <Link
      to={`/all-books/${_id}`}
      className="card bg-base-100 shadow-md hover:shadow-lg transition cursor-pointer"
    >
      <figure className="h-48 overflow-hidden">
        <img
          src={image || defaultBookImg}
          alt={name}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg">{name}</h2>
        <p className="text-sm text-base-content">Author: {author}</p>
        <p
          className={`text-sm font-semibold ${
            isAvailable ? "text-success" : "text-error"
          }`}
        >
          {isAvailable ? "Available" : "Out of Stock"}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;
