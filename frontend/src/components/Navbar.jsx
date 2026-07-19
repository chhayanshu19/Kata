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
    <nav className="sticky top-0 z-40 bg-[#0B1220] border-b border-[#24344A]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3.5">
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14202F] border border-[#24344A] group-hover:border-[#B98D3E]/60 transition-colors">
            <svg
              viewBox="0 0 24 24"
              className="h-4.5 w-4.5 text-[#B98D3E]"
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
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Kata Motors
            </span>
            <span className="text-[10px] font-medium tracking-[0.18em] text-[#7C8AA0] uppercase mt-0.5">
              Dealership Console
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          {user?.isStaff && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#B98D3E]/15 border border-[#B98D3E]/50 text-[#D9AE5F] text-sm font-semibold transition-all duration-150 hover:bg-[#B98D3E] hover:text-[#0B1220] hover:border-[#B98D3E] active:scale-[0.96]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#24344A] text-[#CBD3E1] text-sm font-medium transition-all duration-150 hover:border-[#B3261E]/50 hover:text-white hover:bg-[#B3261E]/10 active:scale-[0.96] active:bg-[#B3261E]/20"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
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
