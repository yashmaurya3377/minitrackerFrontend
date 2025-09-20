import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    setMessage("❌ Passwords don't match!");
    return;
  }

  setLoading(true);
  const res = await signup(formData); 

  if (res.success) {
    setMessage("✅ Signup successful!");
    setTimeout(() => navigate("/"), 1000);
  } else {
    setMessage(res.msg || "Signup failed!");
  }
  setLoading(false);
};

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.password)) {
      setMessage("❌ Please fill in all required fields");
      return;
    }
    if (step === 2 && (!formData.phone || !formData.address)) {
      setMessage("❌ Please fill in all required fields");
      return;
    }
    setMessage("");
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="pt-16 h-screen">
      <section className="flex flex-col lg:flex-row items-stretch text-white min-h-screen">
        {/* Left Side - Background Image */}
        <div
          className="lg:w-1/2 w-full h-48 lg:h-auto bg-gray-500 bg-no-repeat bg-cover bg-center relative flex items-center"
          style={{ backgroundImage: "url(/BG.jpg)" }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0" />
          <div className="w-full px-8 lg:px-24 z-10">
            <h1 className="text-3xl lg:text-5xl font-bold text-left tracking-wide">
              Keep it special
            </h1>
            <p className="text-xl lg:text-3xl my-4 text-left">
              Capture your personal memory in unique way, anywhere.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center px-4 md:px-16 py-8 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <h1 className="my-4 lg:my-6 text-2xl lg:text-3xl font-bold">
              SignUp Here - Step {step} of 3
            </h1>

            {/* Progress bar */}
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-6">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>

            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full p-4 rounded-sm bg-black"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full p-4 rounded-sm bg-black"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password *"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full p-4 rounded-sm bg-black"
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password *"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full p-4 rounded-sm bg-black"
                  required
                />
              </div>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && (
              <div className="space-y-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full p-4 rounded-sm bg-black"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address *"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full p-4 rounded-sm bg-black"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="block w-full p-4 rounded-sm bg-black"
                />
              
              </div>
            )}

            {/* Step 3: Confirm & Submit */}
            {step === 3 && (
              <div className="space-y-6">
                <p className="text-left text-gray-300">
                  ✅ Review your details before creating account
                </p>
                <ul className="text-left text-sm text-gray-400 space-y-1">
                  <li>Name: {formData.name}</li>
                  <li>Email: {formData.email}</li>
                  <li>Phone: {formData.phone}</li>
                  <li>Address: {formData.address}</li>
                  <li>
                    City/Country: {formData.city}, {formData.country}
                  </li>
                </ul>
              </div>
            )}

            {/* Buttons */}
            <div
              className={`flex ${
                step > 1 ? "justify-between" : "justify-end"
              } px-0 pb-2 pt-8`}
            >
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="uppercase block w-1/3 p-3 rounded-full bg-gray-700 hover:bg-gray-600"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`uppercase block ${
                    step > 1 ? "w-2/3 ml-4" : "w-full"
                  } p-3 rounded-full bg-indigo-500 hover:bg-indigo-600`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="uppercase block w-full p-3 rounded-full bg-indigo-500 hover:bg-indigo-600"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              )}
            </div>

            {/* Message */}
            {message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-sm text-amber-300"
              >
                {message}
              </motion.p>
            )}

            <div className="text-center mt-4">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-indigo-400 hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Signup;
