import { combine } from "@/utils/combineClassNames"
import React from "react"

export interface InputProps {
  type: string
  required?: boolean,
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  minLength?: number | undefined
  label?: string
  className?: string
}

const Input = ({ type, required=false, placeholder, value, onChange, minLength=undefined, label, className }: InputProps) => {
  return label ? (
    <label className="grid gap-2">
      {label}
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        minLength={minLength}
        className={combine("border-2 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500", className)}
      />
    </label>
  ) : (
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