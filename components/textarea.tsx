import { combine } from "@/utils/combineClassNames"
import React, { forwardRef } from "react"

export interface TextAreaProps {
  required?: boolean,
  name?: string
  placeholder?: string
  value: string
  label?: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ required=false, placeholder, value, label, onChange, name, className }, ref) => {
  return label ? (
    <div className="grid gap-2">
      <label><>{label}</></label>
      <textarea
        ref={ref}
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        rows={3}
        onChange={onChange}
        className={combine("border-2 min-h-32 max-h-60 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500", className)}
      />
    </div>
  ) : (
    <textarea
      ref={ref}
      required={required}
      name={name}
      placeholder={placeholder}
      value={value}
      rows={3}
      onChange={onChange}
      className={combine("border-2 min-h-32 max-h-60 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500", className)}
    />
  )
})

TextArea.displayName = "Textarea";

export default TextArea