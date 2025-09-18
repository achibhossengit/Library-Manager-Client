import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const { logInWithEmailAndPassword, logInwithGoogle } =
    useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log({ email, password });

    logInWithEmailAndPassword(email, password)
      .then(() => navigate(from))
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    logInwithGoogle()
      .then(() => navigate(from))
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-sm shadow-md bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold text-primary mb-4">
            Login to Zen Library
          </h2>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            disabled={loading}
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" state={from} className="link link-primary">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
