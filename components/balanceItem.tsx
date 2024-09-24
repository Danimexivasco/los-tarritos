import { combine } from "@/utils/combineClassNames"
import React from "react"
import Button from "./button"
import { DELETE_BTN_CLASSES, EDIT_BTN_CLASSES, SOLVE_BTN_CLASSES } from "@/utils/constants"
import EditIcon from "@/public/icons/edit.svg"
import TrashIcon from "@/public/icons/trash.svg"
import CheckIcon from "@/public/icons/check.svg"

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
      isFromPreviousBalance && "bg-orange-400/30 border-orange-200 md:grid gap-4",
      className)}
    >
      <p>{text}</p>
      <div className="grid gap-2">
        <div className="flex gap-2">
          <Button
            icon={<EditIcon className="w-4 h-4"/>}
            type="button"
            className={EDIT_BTN_CLASSES}
            onClick={onEdit}
          />
          <Button
            icon={<TrashIcon className="w-5 h-5"/>}
            type="button"
            className={DELETE_BTN_CLASSES}
            onClick={onRemove}
          />
        </div>
        {isFromPreviousBalance && (
          <Button
            icon={<CheckIcon className="w-5 h-5"/>}
            type="button"
            text="SOLVED"
            className={SOLVE_BTN_CLASSES}
            onClick={onSolve}
          />
        )}
      </div>
    </li>
  )
}

export default BalanceItem