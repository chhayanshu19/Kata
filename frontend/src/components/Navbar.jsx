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
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold">Kata Motors</h1>

        <div className="flex items-center gap-3">
          {user?.isStaff && (
            <Link
              to="/admin"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
