import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(formData);

      loginUser(data);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
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
        className="bg-white p-8 rounded-md shadow-2xl w-full max-w-sm border-t-4 border-[#C81E3A]"
      >
        <div className="mb-7 text-center">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-[#F2A93B] bg-[#14161A] px-3 py-1 rounded-sm mb-3">
            Kata Motors
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-[#14161A]">
            Sign In
          </h1>
        </div>

        {error && (
          <p className="text-[#B23A3A] text-sm font-medium mb-4 bg-[#B23A3A]/10 border border-[#B23A3A]/30 rounded-sm px-3 py-2">
            {error}
          </p>
        )}

        <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          className="w-full border border-[#D8D5CC] p-3 rounded-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
          value={formData.username}
          onChange={handleChange}
        />

        <label className="block text-xs font-mono uppercase tracking-widest text-[#7C8494] mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full border border-[#D8D5CC] p-3 rounded-sm mb-6 focus:outline-none focus:ring-2 focus:ring-[#F2A93B] focus:border-transparent transition"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="w-full bg-[#C81E3A] text-white font-bold uppercase tracking-wide p-3 rounded-sm hover:bg-[#a8172f] transition-colors">
          Login
        </button>

        <p className="mt-6 text-center text-sm text-[#3D4451]">
          Don't have an account?{" "}
          <Link
            className="text-[#C81E3A] font-semibold hover:underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
