import { combine } from "@/utils/combineClassNames"
import React from "react"
import Button from "./button"
import { DELETE_BTN_CLASSES, EDIT_BTN_CLASSES, SOLVE_BTN_CLASSES } from "@/utils/constants"

interface BalanceItemProps {
  text: string
  isGood?: boolean
  isFromPreviousBalance?: boolean
  onRemove: () => void
  onEdit: () => void
  onSolve: () => void
  className?: string
}

const BalanceItem = ({ text, isGood, isFromPreviousBalance, onRemove, onEdit, onSolve, className }: BalanceItemProps) => {
  return (
    <li className={combine(
      "grid grid-cols-1 md:flex gap-4 justify-between items-center rounded p-4 border-solid border-2",
      isGood && "border-emerald-200",
      !isGood && !isFromPreviousBalance && "border-red-200",
      isFromPreviousBalance && "bg-orange-400/30 border-orange-200",
      className)}
    >
      <p>{text}</p>
      <div className="flex gap-4">
        <Button
          type="button"
          text="Edit"
          className={EDIT_BTN_CLASSES}
          onClick={onEdit}
        />
        <Button
          type="button"
          text="Delete"
          className={DELETE_BTN_CLASSES}
          onClick={onRemove}
        />
      </div>
      {isFromPreviousBalance && (
        <Button
          type="button"
          text="SOLUCIONAO 👌"
          className={SOLVE_BTN_CLASSES}
          onClick={onSolve}
        />
      )}
    </li>
  )
}

export default BalanceItem