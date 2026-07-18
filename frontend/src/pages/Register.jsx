import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);

      setSuccess("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Registration failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        {success && <p className="text-green-600 mb-3">{success}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-6"
        />

        <button className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">
          Register
        </button>

        <p className="mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
