import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({
    token: localStorage.getItem("accessToken"),
    isStaff: localStorage.getItem("isStaff") === "true",
  });

  const loginUser = (data) => {
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("isStaff", data.is_staff);

    setUser({
      token: data.access,
      isStaff: data.is_staff,
    });
  };

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isStaff");

    setUser({
      token: null,
      isStaff: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
