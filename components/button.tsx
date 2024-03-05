import { combine } from "@/utils/combineClassNames"
import { GENERAL_BUTTON_CLASSES } from "@/utils/constants"
import { MouseEventHandler } from "react"

export interface ButtonProps {
  text: string,
  type?: "button" | "submit" | "reset"
  onClick?: MouseEventHandler<HTMLButtonElement>
  isTab?: boolean
  className?: string
  disabled?: boolean
}

const Button = ({ text, type, onClick, isTab=false, className, disabled }: ButtonProps) =>
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={combine(!isTab && GENERAL_BUTTON_CLASSES, className)}
  >{text}</button>


export default Button