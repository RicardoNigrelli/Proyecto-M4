"use client";
import { notify } from "@/components/Notifications";
import { IUser} from "@/types";
import { useRouter } from "next/navigation";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: (shouldRedirect?: boolean) => void;
  userLogged: IUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<IUser[]>([]);


  useEffect(() => {
    const storedUserLogged = localStorage.getItem("user")
    const storedLoggedInStatus = localStorage.getItem("isLoggedIn");

    if (storedLoggedInStatus === "true") {
      setIsLoggedIn(true);
    }
    if (storedUserLogged) {
      setUserLogged(JSON.parse(storedUserLogged));
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      setUserLogged(user);
    }
    console.log(user);
    localStorage.setItem("isLoggedIn", "true");
  };

  const router = useRouter();
  const logout = (shouldRedirect: boolean = false) => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    if (shouldRedirect) {
      notify("ToastRegular", "¡Sesión Finalizada!");
      router.push("/");
    }
    
  };

  return (
    <AuthContext.Provider
      value={{ userLogged, isLoggedIn, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
