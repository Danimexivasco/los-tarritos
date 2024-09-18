"use client"
import { combine } from "@/utils/combineClassNames"
import React from "react"
import Button from "./button"
import { getPath } from "@/utils/getPath"
import { deleteTopic } from "@/services/topics"
import { useRouter } from "next/navigation"
import { BG_DONE, BG_TO_DO } from "@/utils/constants"
import { formatDate } from "@/utils/formatDate"
import { Timestamp } from "firebase/firestore"

interface TopicItemProps {
  id?: string
  status: "To do" | "Done"
  title: string
  updatedAt?: Date | Timestamp
  createdAt: Date | Timestamp
  createdBy: string
  className?: string
}

const TopicItem = ({ id, title, status, updatedAt, createdAt, createdBy, className }: TopicItemProps) => {
  const router = useRouter()

  return (
    <li
      className={combine("rounded p-4 grid gap-4",
        status === "Done" ? BG_DONE : BG_TO_DO,
        className
      )}>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex gap-2">
          <p><>{title}</></p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          {/* {(status === ACTIVITY_STATUS.DONE && id) &&
            <Button
              text="🔄"
              className="bg-green-500 hover:bg-green-700 md:w-[50px] shadow-none"
              onClick={() => updateActivity(id, { ...activity, status: ACTIVITY_STATUS.TO_DO })}
            />
          }
          {(status === ACTIVITY_STATUS.IN_PROGRESS && id) &&
            <Button
              text="☑"
              className="bg-green-500 hover:bg-green-700 md:w-[50px] shadow-none"
              onClick={() => updateActivity(id, { ...activity, status: ACTIVITY_STATUS.DONE })}
            />
          } */}
          {id &&
          <>
            <Button
              text="✏"
              onClick={() => router.push(getPath("Edit Topic", id))}
              className="bg-indigo-500 hover:bg-indigo-700 md:w-[50px] shadow-slate-400 hover:shadow-none transition-all"
            />
            <Button
              text="🗑"
              onClick={() => deleteTopic(id)}
              className="bg-red-500 hover:bg-red-700 md:w-[50px] shadow-slate-400 hover:shadow-none transition-all"
            />
          </>
          }
        </div>
      </div>
      <div className="flex items-center justify-between gap-6">
        <p className="text-xs">Created by: {createdBy}</p>
        {updatedAt ? <p className="text-xs">Updated at: {formatDate(updatedAt as Timestamp)}</p>
          :
          <p className="text-xs">Created at: {formatDate(createdAt as Timestamp)}</p>
        }
      </div>
    </li>
  )
}

export default TopicItem