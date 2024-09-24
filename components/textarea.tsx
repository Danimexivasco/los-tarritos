import { combine } from "@/utils/combineClassNames"
import React from "react"

export interface TextAreaProps {
  required?: boolean,
  name?: string
  placeholder?: string
  value: string
  label?: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
}

const TextArea = ({ required=false, placeholder, value, label, onChange, name, className }: TextAreaProps) => {
  return label ? (
    <div className="grid gap-2">
      <label><>{label}</></label>
      <textarea
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        rows={3}
        onChange={onChange}
        className={combine("border-2 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500", className)}
      />
    </div>
  ) : (
    <textarea
      required={required}
      name={name}
      placeholder={placeholder}
      value={value}
      rows={3}
      onChange={onChange}
      className={combine("border-2 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500", className)}
    />
  )
}

export default TextArea