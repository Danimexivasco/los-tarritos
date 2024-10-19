import { combine } from "@/utils/combineClassNames"
import React from "react"

interface TagProps {
  text: string
  className?: string
}
const Tag = ({ text, className }: TagProps) => {
  return (
    <div className={combine("bg-cyan-500 text-white px-2.5 py-1 rounded-lg", className)}>
      {text}
    </div>
  )
}

export default Tag