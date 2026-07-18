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
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-3 rounded mb-4"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-6"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link className="text-blue-600" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
