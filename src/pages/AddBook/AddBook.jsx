import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { CategoryContext } from "../../contexts/CategoryContenxt";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const categories = useContext(CategoryContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.borrowedCount = 0;
    data.addedBy = user?.email;
    setLoading(true);
    try {
      const res = await axios.post("https://library-manager-server-ivory.vercel.app/books", data, {
        headers: { Authorization: user.accessToken },
      });
      if (res.data?.insertedId) {
        toast.success("New Book Added Successfully!");
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-2xl shadow-md bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-primary text-center mb-6">
            Add a New Book
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Image Upload */}
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
              {errors.image && (
                <span className="text-error text-xs">
                  Image URL is required
                </span>
              )}
            </div>

            {/* Book Title */}
            <div className="fieldset">
              <label className="label">
                <span className="label-text">Book Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter book title"
                className="input w-full"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-error text-xs">Title is required</span>
              )}
            </div>

            {/* Quantity */}
            <div className="fieldset">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                className="input w-full"
                {...register("quantity", { required: true, min: 1 })}
              />
              {errors.quantity && (
                <span className="text-error text-xs">
                  Enter a valid quantity
                </span>
              )}
            </div>

            {/* Author Name */}
            <div className="fieldset">
              <label className="label">
                <span className="label-text">Author Name</span>
              </label>
              <input
                type="text"
                placeholder="Author's name"
                className="input w-full"
                {...register("author", { required: true })}
              />
              {errors.author && (
                <span className="text-error text-xs">
                  Author name is required
                </span>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="fieldset">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select w-full"
                {...register("category", { required: true })}
              >
                <option disabled value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-error text-xs">Category is required</span>
              )}
            </div>

            {/* Short Description */}
            <div className="fieldset">
              <label className="label">
                <span className="label-text">Short Description</span>
              </label>
              <textarea
                className="textarea w-full"
                placeholder="Brief description of the book"
                {...register("description")}
              ></textarea>
              {errors.description && (
                <span className="text-error text-xs">
                  Description is required
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="fieldset mt-4">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary w-full"
              >
                {loading ? "Adding book...." : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
