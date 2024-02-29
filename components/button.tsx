import { MouseEventHandler } from "react"

export interface ButtonProps {
  text: string,
  onClick: MouseEventHandler<HTMLButtonElement>
  className: string
}

const Button = ({ text, onClick, className }: ButtonProps) =>
  <button onClick={onClick} className={className}>{text}</button>


export default Button