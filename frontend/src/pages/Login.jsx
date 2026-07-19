import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const { showToast } = useToast();

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

      showToast("Login successful!");

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#14202F] border border-[#24344A] mb-4">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-[#B98D3E]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="3" y="13" width="18" height="5" rx="1.5" />
              <circle
                cx="7.5"
                cy="18"
                r="1.4"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="16.5"
                cy="18"
                r="1.4"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </span>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Sign in to Kata Motors
          </h1>
          <p className="text-sm text-[#7C8AA0] mt-1">
            Dealership inventory console
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-7 rounded-xl shadow-xl border border-[#E4E7EC]"
        >
          {error && (
            <p className="text-[#B3261E] text-sm font-medium mb-4 bg-[#FBEAEA] border border-[#F3C6C4] rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <label className="block text-xs font-medium uppercase tracking-wide text-[#667085] mb-1.5">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full border border-[#D0D5DD] p-2.5 rounded-lg mb-4 text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
            value={formData.username}
            onChange={handleChange}
          />

          <label className="block text-xs font-medium uppercase tracking-wide text-[#667085] mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border border-[#D0D5DD] p-2.5 rounded-lg mb-6 text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#B98D3E]/40 focus:border-[#B98D3E] transition"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="w-full bg-[#0B1220] text-white font-medium p-2.5 rounded-lg transition-all duration-150 hover:bg-[#182338] active:scale-[0.98] active:bg-[#060A12]">
            Login
          </button>

          <p className="mt-5 text-center text-sm text-[#667085]">
            Don't have an account?{" "}
            <Link
              className="text-[#B98D3E] font-medium hover:underline"
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
