import defaultBookImg from "../../assets/defaultBook.png";

const BookDetails = ({ book, onClose }) => {
  const {
    image,
    name,
    author,
    quantity,
    category,
    description,
    borrowedCount,
    publish_year = "2023-01-01", // default fallback
    ratings = 4.5, // default fallback
  } = book;

  const isAvailable = parseInt(quantity) > 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
      <div className="card w-full max-w-md bg-base-100 shadow-xl animate__animated animate__fadeInUp">
        <figure className="max-h-56 overflow-hidden">
          <img
            src={image || defaultBookImg}
            alt={name}
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body space-y-2">
          <h2 className="card-title text-xl">{name}</h2>
          <p>
            <strong>Author:</strong> {author}
          </p>
          <p>
            <strong>Category:</strong> {category}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Publishing Year:</strong> {publish_year}
          </p>
          <p>
            <strong>Ratings:</strong> ⭐ {ratings}
          </p>
          <p>
            <strong>Borrowed Count:</strong> {borrowedCount}
          </p>
          <p
            className={`font-semibold ${
              isAvailable ? "text-success" : "text-error"
            }`}
          >
            {isAvailable ? "Available" : "Out of Stock"}
          </p>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary" disabled={!isAvailable}>
              Borrow Now
            </button>
            <button className="btn btn-outline" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
