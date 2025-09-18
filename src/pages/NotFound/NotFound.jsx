import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <h1 className="text-5xl font-bold text-error mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-primary mb-2">
        Page Not Found
      </h2>
      <p className="text-base-content mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
