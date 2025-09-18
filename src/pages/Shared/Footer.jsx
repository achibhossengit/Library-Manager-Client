import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo.png";
import Links from "./Links";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        {/* Left: Logo, Name & Vision */}
        <div>
          <div className="flex items-center gap-2 justify-start mb-2">
            <img className="max-w-12" src={logo} alt="" />{" "}
            <span className="text-3xl font-bold text-primary">Zen Library</span>
          </div>
          <p className="text-xs sm:text-sm">
            Zen Library is committed to making knowledge accessible, organized,
            and beautifully simple. Our vision is to empower readers and
            creators through a seamless digital experience.
          </p>
        </div>

        {/* Middle: Navigation Links */}
        <div className="hidden md:block">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <Links></Links>
          </ul>
        </div>

        {/* Right: Social Links & Newsletter */}
        <div>
          <h3 className="font-semibold mb-2">Stay Connected</h3>
          <div className="flex gap-3 mb-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook size={30}></FaFacebook>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter size={30}></FaTwitter>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram size={30}></FaInstagram>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin size={30}></FaLinkedin>
            </a>
          </div>
          <form className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Subscribe to our newsletter</span>
            </label>
            <div className="join">
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom: Developer Info */}
      <div className="footer footer-center p-4 bg-base-300 text-xs">
        <p className="flex">
          Developed by —
          <a
            href="https://achibhossen.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover text-primary font-medium"
          >
            Achibhossen
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
