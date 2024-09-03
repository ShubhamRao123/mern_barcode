// SignUp.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // State to store error messages

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear any previous error

    try {
      const res = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User signed up:", data);
        // Navigate to login page upon successful signup
        navigate("/login");
      } else {
        console.error("Error signing up:", data.error);
        setError(data.error || "Error signing up");
      }
    } catch (err) {
      console.error("Error signing up:", err);
      setError("Error signing up");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-4 sm:p-6 bg-gray-800 shadow-md rounded-lg w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl sm:text-3xl text-center font-semibold mb-4 sm:mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-2 sm:p-3 rounded-lg text-black text-sm sm:text-base"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 sm:p-3 rounded-lg text-black text-sm sm:text-base"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 sm:p-3 rounded-lg text-black text-sm sm:text-base"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-2 sm:p-3 rounded-lg text-black text-sm sm:text-base"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-800 text-white p-2 sm:p-3 rounded-lg uppercase text-xs sm:text-base hover:opacity-85"
          >
            Sign Up
          </button>
        </form>
        <div className="flex gap-1 sm:gap-2 mt-4 sm:mt-5 justify-center">
          <p className="text-xs sm:text-sm">Have an account?</p>
          <Link to="/login">
            <span className="text-blue-600 text-xs sm:text-sm hover:underline">
              Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
