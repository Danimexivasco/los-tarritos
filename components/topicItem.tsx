"use client"
import { combine } from "@/utils/combineClassNames"
import React from "react"
import Button from "./button"
import { getPath } from "@/utils/getPath"
import { deleteTopic, updateTopic } from "@/services/topics"
import { useRouter } from "next/navigation"
import { BG_DONE, BG_TO_DO, DELETE_BTN_CLASSES, DONE_BTN_CLASSES, EDIT_BTN_CLASSES, REDO_BTN_CLASSES } from "@/utils/constants"
import { formatDate } from "@/utils/formatDate"
import { Timestamp } from "firebase/firestore"

interface TopicItemProps {
  id?: string
  status: "To do" | "Done"
  title: string
  description: string
  updatedAt?: Date | Timestamp
  createdAt: Date | Timestamp
  createdBy: string
  className?: string
}

const TopicItem = ({ id, title, description, status, updatedAt, createdAt, createdBy, className }: TopicItemProps) => {
  const topic = { id, title, description, status, updatedAt, createdAt, createdBy }
  const router = useRouter()

  return (
    <li
      className={combine("rounded p-4 grid gap-4",
        status === "Done" ? BG_DONE : BG_TO_DO,
        className
      )}>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
        <div className="grid gap-2">
          <h3 className="font-bold text-lg"><>{title}</></h3>
          <p className="line-clamp-2">{description}</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          {(status === "To do") &&
            <Button
              text="☑"
              className={DONE_BTN_CLASSES}
              onClick={() => updateTopic(id as string, { ...topic, status: "Done" })}
            />
          }
          {(status === "Done") &&
            <Button
              text="🔄"
              className={REDO_BTN_CLASSES}
              onClick={() => updateTopic(id as string, { ...topic, status: "To do" })}
            />
          }
          {id &&
          <>
            <Button
              text="✏"
              onClick={() => router.push(getPath("Edit Topic", id))}
              className={EDIT_BTN_CLASSES}
            />
            <Button
              text="🗑"
              onClick={() => deleteTopic(id)}
              className={DELETE_BTN_CLASSES}
            />
          </>
          }
        </div>
      </div>
      <div className="flex items-center justify-between gap-6">
        <i className="text-xs">Created by: <br/>{createdBy}</i>
        {updatedAt ? <i className="text-xs">Updated at: <br/>{formatDate(updatedAt as Timestamp)}</i>
          :
          <i className="text-xs">Created at: <br/>{formatDate(createdAt as Timestamp)}</i>
        }
      </div>
    </li>
  )
}

export default TopicItem