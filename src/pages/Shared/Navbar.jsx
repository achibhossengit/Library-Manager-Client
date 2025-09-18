import { Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";
import Links from "./Links";

const Navbar = () => {
  const user = null;
  const logOut = () => {
    console.log("Develop it");
  };

  const handleSignOut = () => {
    logOut();
  };

  return (
    <div className="bg-base-100 shadow-md px-2 sm:px-4">
      <div className="navbar max-w-6xl mx-auto">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40 sm:w-52"
          >
            <Links></Links>
          </ul>
        </div>

        {/* Left: Logo + Name */}
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm sm:text-xl font-bold text-primary"
          >
            <img className="hidden lg:flex max-w-8 " src={logo} alt="" />{" "}
            <span>Zen Library</span>
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 sm:gap-2">
            <Links></Links>
          </ul>
        </div>

        {/* Right: Auth Buttons or User Dropdown */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar btn-sm"
              >
                <div className="w-8 sm:w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/0jqHpnp/user.png"}
                    alt="user"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40 sm:w-52"
              >
                <li>
                  <span className="text-xs sm:text-sm flex items-center gap-1">
                    <FaUserCircle /> {user.displayName}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-xs sm:text-sm"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-1 sm:gap-2">
              <Link to="/login" className="btn btn-outline btn-xs sm:btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-xs sm:btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
