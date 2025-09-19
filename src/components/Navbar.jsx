import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CircleUserRound, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import ProfileCard from "../Pages/ProfileCard";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Create Event", path: "/create-event" },
    { name: "Events", path: "/events" },
  ];

  const handleNavClick = (path) => {
    setIsOpen(false);
    setProfile(false);
    navigate(path);
  };

  const renderLinks = (isMobile = false) =>
    navLinks
      .filter((link) => user || link.name === "Home")
      .map((link) => (
        <li key={link.path}>
          <NavLink
            to={link.path}
            onClick={() => handleNavClick(link.path)}
            className={({ isActive }) =>
              `block text-center px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-blue-50 hover:text-blue-600"
              } ${isMobile ? "w-full" : ""}`
            }
          >
            {link.name}
          </NavLink>
        </li>
      ));

  const buttonClass =
    "px-4 py-2 rounded-lg font-medium transition text-white hover:opacity-90";

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700"
          onClick={() => setProfile(false)}
        >
          Mini Tracker
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 items-center text-gray-700 font-medium">
          {renderLinks()}
          {!user ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={`${buttonClass} bg-blue-600 hover:bg-blue-700`}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={`${buttonClass} bg-green-600 hover:bg-green-700`}
                >
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => setProfile(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                title="Profile"
              >
                <CircleUserRound />
              </button>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white shadow-md px-6 py-6 space-y-4 text-gray-700 font-medium"
          >
            {renderLinks(true)}
            {!user ? (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={`${buttonClass} bg-blue-600 hover:bg-blue-700 w-full block text-center`}
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={`${buttonClass} bg-green-600 hover:bg-green-700 w-full block text-center`}
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    setProfile(true);
                    setIsOpen(false);
                  }}
                  className=" mx-auto w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                  title="Profile"
                >
                  <CircleUserRound />
                </button>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {profile && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-900/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black opacity-60"
              onClick={() => setProfile(false)}
            ></div>

            {/* Modal Content */}
            <motion.div
              className="relative z-10 bg-white rounded-lg shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileCard onClose={() => setProfile(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
