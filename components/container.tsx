import { combine } from "@/utils/combineClassNames"
import React from "react"

const Container = ({ children, className, fullHeight = false }: {children: React.ReactNode, className?: string, fullHeight?: boolean}) => {
  return (
    <section className={combine("p-6 lg:p-12 max-w-7xl mx-auto", fullHeight && "min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-7.5rem)] h-full", className)}>{children}</section>
  )
}

export default Container