"use client";

import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initializeAuth } = useUserStore();

  useEffect(() => {
    // Initialize auth only once when the app starts
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}
