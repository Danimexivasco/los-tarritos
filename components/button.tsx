import { combine } from "@/utils/combineClassNames"
import { BUTTON_WITH_ICON_CLASSES, GENERAL_BUTTON_CLASSES } from "@/utils/constants"
import { MouseEventHandler } from "react"

export interface ButtonProps {
  text?: string,
  type?: "button" | "submit" | "reset"
  onClick?: MouseEventHandler<HTMLButtonElement>
  isTab?: boolean
  icon?: JSX.Element
  iconRight?: boolean
  className?: string
  disabled?: boolean
}

const Button = ({ text, type, onClick, isTab=false, icon, iconRight=false, className, disabled }: ButtonProps) =>
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={combine(!isTab && GENERAL_BUTTON_CLASSES, icon && BUTTON_WITH_ICON_CLASSES, className)}
  >
    {icon && !iconRight && icon}
    {text}
    {icon && iconRight && icon}
  </button>


export default Button