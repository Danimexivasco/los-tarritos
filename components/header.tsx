"use client"
import { useState } from "react";
import { Squash as Hamburger } from "hamburger-react"
import Menu from "./menu";

const Header = () => {
  const [ isOpen, setOpen ] = useState(false)
  
  return(
    <div className="relative">
      <header className="h-14 md:h-16 bg-cyan-500 text-white flex items-center p-4 justify-between z-50 relative">
        <h1 className="text-xs md:text-lg">Nuestros Tarritos 🏺</h1>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </header>
      <Menu isOpen={isOpen} setOpen={setOpen}/>
    </div>
  )
}

export default Header