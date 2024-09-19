"use client"
import { combine } from "@/utils/combineClassNames"
import React from "react"
import Button from "./button"
import { getPath } from "@/utils/getPath"
import { deleteTopic, updateTopic } from "@/services/topics"
import { useRouter } from "next/navigation"
import { BG_DONE, BG_TO_DO } from "@/utils/constants"
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
              className="bg-green-500 hover:bg-green-700 md:w-[50px] shadow-none"
              onClick={() => updateTopic(id as string, { ...topic, status: "Done" })}
            />
          }
          {(status === "Done") &&
            <Button
              text="🔄"
              className="bg-green-500 hover:bg-green-700 md:w-[50px] shadow-none"
              onClick={() => updateTopic(id as string, { ...topic, status: "To do" })}
            />
          }
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