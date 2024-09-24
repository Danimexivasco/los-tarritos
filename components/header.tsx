"use client"
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react"
import Menu from "./menu";
import AmphoraIcon from "@/public/icons/amphora.svg"
import Link from "./link";
import { getPath } from "@/utils/getPath";

const Header = () => {
  const [ isOpen, setOpen ] = useState(false)
  
  return(
    <div className="relative">
      <header className="h-14 md:h-16 bg-cyan-500 text-white flex items-center pl-6 pr-5 md:p-6 justify-between z-50 relative">
        <Link href={getPath("Home")}>
          <h1 className="text-md md:text-lg text-white">Nuestros Tarritos <AmphoraIcon className="inline w-6 h-6"/></h1>
        </Link>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </header>
      <Menu isOpen={isOpen} setOpen={setOpen}/>
    </div>
  )
}

export default Header