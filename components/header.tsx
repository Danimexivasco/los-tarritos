"use client"
import { logOut, useAuthState } from "@/services/auth";
import { useRouter } from "next/navigation";
import Button from "./button";
import { AUTH_ROUTES } from "@/utils/constants";

const Header = () => {
  const router = useRouter()
  const [ user, loading, error ] = useAuthState();
  const handleLogout = async () => {
    await logOut()
    router.push(AUTH_ROUTES.LOGIN)
  }
  return(
    <header className="h-14 md:h-16 bg-cyan-500 text-white flex items-center p-4 justify-between">
      <h1 className="text-xs md:text-lg">Los Tarritos 🏺</h1>
      {user &&
      <div className="flex gap-2 items-center">
        <p className="text-xs">{user.email}</p>
        <Button text="Log Out" className="bg-red-500 hover:bg-red-700 text-xs md:text-md w-fit shadow-none" onClick={handleLogout}/>
      </div>
      }
    </header>
  )
}

export default Header