import { combine } from "@/utils/combineClassNames"
import React from "react"

export interface ContainerProps {
  children: React.ReactNode
  className?: string
  fullHeight?: boolean
  centered?: boolean
}

const Container = ({ children, className, fullHeight = false, centered = false } : ContainerProps) => {
  return (
    <section
      className={combine("p-6 lg:p-12 max-w-7xl",
        fullHeight && "min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-7.5rem)] h-full",
        centered && "mx-auto",
        className)
      }
    >
      {children}
    </section>
  )
}

export default Container