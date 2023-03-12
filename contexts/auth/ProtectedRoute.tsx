"use client";

import Spinner from "@/components/Spinner";
import ROUTES from "@/constants/routes";
import { usePathname, useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthProvider";

interface IProps {
  children: ReactNode;
}

const ProtectedRoute: FC<IProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    } else if (pathname === ROUTES.LOGIN) {
      router.replace(ROUTES.MANAGE_USERS);
    }
  }, [isAuthenticated]);

  return pathname === ROUTES.LOGIN || isAuthenticated ? (
    <>{children}</>
  ) : (
    <Spinner isFullscreen />
  );
};

export default ProtectedRoute;
