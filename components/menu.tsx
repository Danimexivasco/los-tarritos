import { useRouter } from "next/navigation"
import { logOut, useAuthState } from "@/services/auth"
import { AUTH_ROUTES, ROUTES } from "@/utils/routes"
import { combine } from "@/utils/combineClassNames"
import { MENU_CLASSES } from "@/utils/constants"
import React from "react"
import Link from "./link"
import Button from "./button"
import LogoutIcon from "@/public/icons/logout.svg"

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

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setOpen(false)
  }

  return (
    <div className={MENU_CLASSES}>
      <div
        className={combine(
          "w-100 h-[100vh] bg-black transition-all duration-500 ease-in-out",
          `${isOpen ? "no-doc-scroll bg-opacity-75" : "bg-opacity-0"}`
        )}
        onClick={handleOutsideClick}
      >
        <nav
          className={combine(
            MENU_CLASSES,
            "px-5 py-10 bg-white transition-all duration-500 ease-in-out",
            `${isOpen ? "top-[56px] md:top-[64px]" : "top-[-105vh]"}`)}
          onClick={e => e.stopPropagation()}
        >
          <ul className="space-y-4">
            {ROUTES.filter(route => route.onMenu).map((route) => (
              <li key={route.name} onClick={() => setOpen(false)} className="w-fit">
                <Link href={route.path} className="text-2xl hover:text-cyan-400">{route.name}</Link>
              </li>
            ))}
            {user &&
              <li>
                <div className="grid gap-2 mt-12">
                  <p className="text-xs">Logged in as <i>{user.email}</i></p>
                  <Button
                    icon={<LogoutIcon className="w-5 h-5"/>}
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