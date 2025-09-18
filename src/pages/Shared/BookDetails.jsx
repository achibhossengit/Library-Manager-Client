import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const BookDetails = ({
  book,
  setSelectedBook = null,
  setBooks,
  onClose,
  show_action = false,
}) => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const { register, handleSubmit, reset } = useForm({ defaultValues: book });

  const isAvailable = parseInt(book.quantity) > 0;

  // Handle update
  const handleUpdate = async (updatedData) => {
    setLoadingAction(true);
    try {
      await axios.put(`http://localhost:3000/books/${book._id}`, updatedData, {
        headers: {
          Authorization: user.accessToken,
        },
      });

      toast.success("Book updated successfully");

      setSelectedBook(updatedData);
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b._id === book._id ? { ...b, ...updatedData } : b
        )
      );

      setIsEditing(false);
      reset(updatedData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update book");
    } finally {
      setLoadingAction(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirm) return;

    setLoadingAction(true);
    try {
      await axios.delete(`http://localhost:3000/books/${book._id}`, {
        headers: {
          Authorization: user.accessToken,
        },
      });
      setBooks((prevBooks) => prevBooks.filter((b) => b._id !== book._id));
      toast.success("Book deleted successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-base-100/30 backdrop-blur-md flex items-center justify-center z-50 transition-opacity">
      <div className="card w-full max-w-md bg-base-100 shadow-lg">
        <figure className="h-48 overflow-hidden">
          <img
            src={book.image}
            alt={book.name}
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body space-y-2">
          {isEditing ? (
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-2">
              <div className="fieldset">
                <label className="label">
                  <span className="label-text">Book Cover Image URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="input w-full"
                  {...register("image", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  {...register("name")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">Author</label>
                <input
                  {...register("author")}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">Quantity</label>
                <input
                  {...register("quantity")}
                  type="number"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">Category</label>
                <select
                  className="select w-full"
                  {...register("category", { required: true })}
                >
                  <option disabled value="">
                    Select category
                  </option>
                  <option value="Novel">Novel</option>
                  <option value="Thriller">Thriller</option>
                  <option value="History">History</option>
                  <option value="Drama">Drama</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">Description</label>
                <textarea
                  {...register("description")}
                  className="textarea textarea-bordered w-full"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn btn-outline"
                  disabled={loadingAction}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loadingAction}
                >
                  {loadingAction ? "Updating..." : "Apply Update"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="card-title text-xl">{book.name}</h2>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Category:</strong> {book.category}
              </p>
              <p>
                <strong>Description:</strong> {book.description}
              </p>
              <p>
                <strong>Borrowed Count:</strong> {book.borrowedCount}
              </p>
              <p
                className={`font-semibold ${
                  isAvailable ? "text-success" : "text-error"
                }`}
              >
                {isAvailable ? "Available" : "Out of Stock"}
              </p>
            </>
          )}

          <div className="card-actions justify-end mt-4 flex gap-2">
            {!isEditing && (
              <button className="btn btn-outline" onClick={onClose}>
                Close
              </button>
            )}
            {show_action ? (
              isEditing ? null : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={handleDelete}
                    disabled={loadingAction}
                  >
                    {loadingAction ? "Deleting..." : "Delete"}
                  </button>
                </>
              )
            ) : (
              <button className="btn btn-primary" disabled={!isAvailable}>
                Borrow Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
