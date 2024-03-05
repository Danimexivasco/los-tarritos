"use client"
import React, { useEffect, useState, createContext } from "react"
import { useRouter, usePathname  } from "next/navigation";
import { useAuthState } from "@/services/auth";
import { AUTH_ROUTES } from "@/utils/constants";

export const UserContext = createContext<any>(null)
const ProtectedRoute = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter()
  const pathname = usePathname()
  const authRoutes = Object.values(AUTH_ROUTES)
  const [ user, loading, error ] = useAuthState();

  useEffect(() => {
    if (!user && !loading && !error) return router.push(AUTH_ROUTES.LOGIN);
    if (authRoutes.includes(pathname) && user) {
      return router.push("/")
    }
  }, [ user, loading, error ])

  return (user || authRoutes.includes(pathname)) && (
    <>
      <UserContext.Provider value={{ user }}>
        { children }
      </UserContext.Provider>
    </>
  )
}

export default ProtectedRoute