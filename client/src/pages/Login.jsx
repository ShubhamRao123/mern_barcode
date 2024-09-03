// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext"; // Import the useAuth hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State to store error messages
  const { login } = useAuth(); // Destructure login function
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User logged in:", data);
        login(); // Update authentication state
        navigate("/sender"); // Redirect to home page upon successful login
      } else {
        setError("Incorrect email or password"); // Set error message
        console.error("Login failed:", data.error);
      }
    } catch (err) {
      setError("An error occurred while logging in"); // Set error message
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-6 bg-gray-800 bg-opacity-50 shadow-md rounded-lg w-full max-w-md mx-auto">
        <h1 className="text-2xl sm:text-3xl text-center font-semibold mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg text-black text-sm sm:text-base"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg text-black text-sm sm:text-base"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-800 text-white p-3 rounded-lg uppercase hover:opacity-85 text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
