"use client"
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react"
import { getPath } from "@/utils/getPath";
import Menu from "./menu";
import Link from "./link";
import AmphoraIcon from "@/public/icons/amphora.svg"
import LogoIcon from "@/public/icons/logo.svg"

const Header = () => {
  const [ isOpen, setOpen ] = useState(false)
  
  return(
    <div className="relative">
      <header className="h-14 md:h-16 bg-cyan-500 text-white flex items-center pl-6 pr-5 md:p-6 justify-between z-50 relative">
        <Link href={getPath("Home")}>
          <LogoIcon className="w-auto h-[35px] md:h-[40px] "/>
        </Link>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </header>
      <Menu isOpen={isOpen} setOpen={setOpen}/>
    </div>
  )
}

export default Header