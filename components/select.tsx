import React from "react"

export interface SelectProps {
  options: Array<{
    value: string
    label: string
  }>
  label?: string
  value: string,
  name?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({ options, label, value, name, onChange }: SelectProps) => {
  return label ? (
    <div className="grid gap-2">
      <label><>{label}</></label>
      <select
        className="border-2 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500 focus:invalid:border-red-500 invalid:border-red-500"
        value={value}
        name={name}
        onChange={onChange}
      >
        {options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </div>
  ) : (
    <select
      className="border-2 border-cyan-500/30 p-4 rounded focus:outline-none focus:border-cyan-500 focus:invalid:border-red-500 invalid:border-red-500"
      value={value}
      name={name}
      onChange={onChange}
    >
      {options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  )
}

export default Select