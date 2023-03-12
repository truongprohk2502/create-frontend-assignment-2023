"use client";

import ROUTES from "@/constants/routes";
import axiosRequest from "@/utils/axiosRequest";
import { ILoginSchema } from "@/validations/Login.schema";
import { useRouter } from "next/navigation";
import { createContext, FC, ReactNode, useState, useContext } from "react";

interface IProps {
  children: ReactNode;
}

interface IAuthContextValue {
  isAuthenticated: boolean;
  loading: boolean;
  errorDetails: string;
  login: (data: ILoginSchema) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextValue>({
  isAuthenticated: false,
  loading: false,
  errorDetails: "",
  login: () => {},
  logout: () => {},
});

const AuthProvider: FC<IProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string>("");

  const router = useRouter();

  const login = async (credentials: ILoginSchema) => {
    try {
      setLoading(true);

      const data = await axiosRequest({
        url: "/api/auth",
        method: "post",
        data: credentials,
      });

      if (data.auth === true) {
        setIsAuthenticated(true);
        setErrorDetails("");
        router.replace(ROUTES.MANAGE_USERS);
      }
    } catch (err: any) {
      setIsAuthenticated(false);
      setErrorDetails(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.replace(ROUTES.HOME);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, errorDetails, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
