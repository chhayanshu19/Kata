import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-40 bg-[#14161A] border-b-2 border-[#C81E3A] shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E2126] border border-[#3D4451] group-hover:border-[#F2A93B] transition-colors">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-[#F2A93B]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="16.5"
                cy="18"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-[0.12em] text-white uppercase">
              Kata Motors
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#F2A93B] uppercase mt-1">
              Dealership Console
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user?.isStaff && (
            <Link
              to="/admin"
              className="px-4 py-2 rounded-sm border border-[#F2A93B]/70 text-[#F2A93B] font-semibold text-sm uppercase tracking-wide hover:bg-[#F2A93B] hover:text-[#14161A] transition-colors"
            >
              Admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#3D4451] text-white text-sm font-semibold uppercase tracking-wide hover:bg-[#B23A3A] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
