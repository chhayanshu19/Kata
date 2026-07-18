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

      showToast("Registration successful!");

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
    <div
      className="min-h-screen flex items-center justify-center bg-[#14161A] px-4"
      style={{
        backgroundImage: "radial-gradient(#2A2E36 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-2xl w-full max-w-sm border-t-4 border-[#3F9C63]"
      >
        <div className="mb-7 text-center">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-[#F2A93B] bg-[#14161A] px-3 py-1 rounded-sm mb-3">
            Kata Motors
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#14161A]">
            Create Account
          </h1>
        </div>

        {error && (
          <p className="text-[#B23A3A] text-sm font-medium mb-3 bg-[#B23A3A]/10 border border-[#B23A3A]/30 rounded-sm px-3 py-2 break-words">
            {error}
          </p>
        )}

        {success && (
          <p className="text-[#3F9C63] text-sm font-medium mb-3 bg-[#3F9C63]/10 border border-[#3F9C63]/30 rounded-sm px-3 py-2">
            {success}
          </p>
        )}

        <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-[#D8D5CC] p-3 rounded-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#3F9C63] focus:border-transparent transition"
        />

        <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-[#D8D5CC] p-3 rounded-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#3F9C63] focus:border-transparent transition"
        />

        <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-[#D8D5CC] p-3 rounded-sm mb-6 focus:outline-none focus:ring-2 focus:ring-[#3F9C63] focus:border-transparent transition"
        />

        <button className="w-full bg-[#3F9C63] text-white font-bold uppercase tracking-wide p-3 rounded-sm hover:bg-[#347f51] transition-colors">
          Register
        </button>

        <p className="mt-6 text-center text-sm text-[#3D4451]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#C81E3A] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
