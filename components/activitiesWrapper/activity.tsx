"use client"
import { Activity } from "@/types"
import React from "react"
import Button from "@/components/button"
import { combine } from "@/utils/combineClassNames"
import { useRouter } from "next/navigation"
import { ACTIVITY_STATUS, DELETE_BTN_CLASSES, DONE_BTN_CLASSES, EDIT_BTN_CLASSES, REDO_BTN_CLASSES } from "@/utils/constants"
import { deleteActivity, updateActivity } from "@/services/activities"
import { DocumentData } from "firebase/firestore"
import { getPath } from "@/utils/getPath"
import RedoIcon from "@/public/icons/redo.svg"
import CheckIcon from "@/public/icons/check.svg"
import EditIcon from "@/public/icons/edit.svg"
import TrashIcon from "@/public/icons/trash.svg"

export interface ActivityProps {
  key?: string
  activity: Activity | DocumentData
  className: string
}

const ActivityItem = ({ activity, className }: ActivityProps) => {
  const router = useRouter()
  const { id, text, status } = activity
  return(
    <div className={combine("rounded p-4 flex flex-col md:flex-row justify-between md:items-center gap-4", className)}>
      <div className="flex gap-2">
        <p><>{text}</></p>
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        {(status === ACTIVITY_STATUS.DONE && id) &&
          <Button
            icon={<RedoIcon className="w-5 h-5"/>}
            className={REDO_BTN_CLASSES}
            onClick={() => updateActivity(id, { ...activity, status: ACTIVITY_STATUS.TO_DO })}
          />
        }
        {(status === ACTIVITY_STATUS.IN_PROGRESS && id) &&
          <Button
            icon={<CheckIcon className="w-5 h-5"/>}
            className={DONE_BTN_CLASSES}
            onClick={() => updateActivity(id, { ...activity, status: ACTIVITY_STATUS.DONE })}
          />
        }
        {id &&
        <>
          <Button
            icon={<EditIcon className="w-5 h-5"/>}
            onClick={() => router.push(getPath("Edit Activity", id))}
            className={EDIT_BTN_CLASSES}
          />
          <Button
            icon={<TrashIcon className="w-5 h-5"/>}
            onClick={() => deleteActivity(id)}
            className={DELETE_BTN_CLASSES}
          />
        </>
        }
      </div>
    </div>
  )
}

export default ActivityItem