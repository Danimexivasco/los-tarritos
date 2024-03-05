import { combine } from "@/utils/combineClassNames"
import React from "react"

export interface InputProps {
  type: string
  required?: boolean,
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  minLength?: number | undefined
  className?: string
}

const Input = ({ type, required=false, placeholder, value, onChange, minLength=undefined, className }: InputProps) => {
  return (
    <input
      required={required}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      minLength={minLength}
      className={combine("border-2 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500", className)}
    />
  )
}

export default Input