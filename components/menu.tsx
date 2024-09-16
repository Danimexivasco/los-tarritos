import { combine } from "@/utils/combineClassNames"
import { MENU_CLASSES } from "@/utils/constants"
import React from "react"
import Link from "./link"
import Button from "./button"
import { logOut, useAuthState } from "@/services/auth"
import { useRouter } from "next/navigation"
import { AUTH_ROUTES, ROUTES } from "@/utils/routes"

export interface MenuProps {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = ({ isOpen, setOpen }: MenuProps) => {
  const [ user, loading, error ] = useAuthState();
  const router = useRouter()

  const handleLogout = async () => {
    await logOut()
    router.push(AUTH_ROUTES.LOGIN)
  }

  return (
    <div
      className={combine(MENU_CLASSES, `${isOpen ? "top-[56px] md:top-[64px] no-doc-scroll" : "top-[-105vh]"}`)}
    >
      <div className=" w-100 h-[100vh] bg-black bg-opacity-75">
        <nav className="px-5 py-10 bg-white">
          <ul className="space-y-4">
            {ROUTES.filter(route => route.onMenu).map((route) => (
              <li key={route.name} onClick={() => setOpen(false)}>
                <Link href={route.path} className="text-2xl hover:text-cyan-400">{route.name}</Link>
              </li>
            ))}
            {user &&
              <li>
                <div className="grid gap-2 mt-12">
                  <p className="text-xs">Logged in as <i>{user.email}</i></p>
                  <Button
                    text="Log Out"
                    className="bg-red-500 hover:bg-red-700 text-xs md:text-md !w-fit shadow-none"
                    onClick={handleLogout}
                  />
                </div>
              </li>
            }
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Menu