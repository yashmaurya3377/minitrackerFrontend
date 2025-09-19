import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(formData.email, formData.password);

    if (res.success) {
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } else {
      setMessage(res.msg);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold mb-6 text-center text-amber-100"
        >
          Welcome Back 👋
        </motion.h2>

        {/* Email */}
        <div className="mb-4">
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#f59e0b" }}
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            value={formData.email}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#f59e0b" }}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>
        {/* Forgot */}
        <div className="flex items-center justify-between mb-4 text-sm">
          
          <Link
            to="/signup"
            className="text-amber-400 hover:text-amber-300"
          >
            Forgot password?
          </Link>
        </div>
        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-amber-400 text-gray-900 py-3 rounded-lg font-semibold shadow-lg hover:bg-amber-300 transition flex justify-center items-center"
        >
          {loading ? (
            <motion.div
              className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          ) : (
            "Sign In"
          )}
        </motion.button>

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm text-amber-200"
          >
            {message}
          </motion.p>
        )}

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-amber-100">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-amber-400 hover:text-amber-300"
          >
            Create one
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
