import { combine } from "@/utils/combineClassNames"
import React, { forwardRef } from "react";

export interface InputProps {
  type: string
  required?: boolean,
  name?: string
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  minLength?: number | undefined
  label?: string
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ type, required=false, placeholder, value, onChange, minLength=undefined, label, name, className }, ref) => {
  return label ? (
    <label className="grid gap-2">
      {label}
      <input
        ref={ref}
        required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        minLength={minLength}
        className={combine("border-2 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500", className)}
      />
    </label>
  ) : (
    <input
      ref={ref}
      required={required}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      minLength={minLength}
      className={combine("border-2 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500", className)}
    />
  )
})
// Set the display name
Input.displayName = "Input";

export default Input