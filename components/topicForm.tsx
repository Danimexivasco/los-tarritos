"use client"
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Topic } from "@/types"
import { createTopic, updateTopic, useSingleTopicData } from "@/services/topics"
import { CANCEL_BTN_CLASSES, CONFIRM_BTN_CLASSES, TOPIC_INPUTS, TOPIC_STATUS } from "@/utils/constants"
import { getPath } from "@/utils/getPath"
import Button from "@/components/button"
import Input from "@/components/input"
import Link from "@/components/link"
import { UserContext } from "@/components/protectedRoute"
import Select from "@/components/select"
import TextArea from "@/components/textarea"
import Headline from "./headline"
import { showMsg } from "@/utils/showMessage"
import { sendEmail } from "@/utils/sendEmail"

interface TopicFormProps {
  id?: string
}

const TopicForm = ({ id }: TopicFormProps) => {
  const isEdit = Boolean(id)
  const { user } = useContext(UserContext);
  const router = useRouter()
  const [ topic, loading, error ] = useSingleTopicData(id ?? "editando123")
  const [ formData, setFormData ] = useState<Topic>({
    status: TOPIC_STATUS[ 0 ],
    title: "",
    description: "",
    createdAt: new Date(),
    createdBy: user?.email ?? "🤷‍♂️",
  })

  useEffect(() => {
    if (topic) {
      setFormData({ ...topic as Topic })
    }
  }, [ topic ])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEdit) {
      try {
        await updateTopic(id as string, { ...formData, updatedAt: new Date() })
        await sendEmail({
          actor: user?.email,
          subject: `Los tarritos🫙. A topic have been updated by ${user?.email}`,
          message: `A topic have been updated by <strong>${user?.email}.</strong><br/><br/>
          <strong>Date:</strong><br/>${formData.createdAt} | <strong>Status:</strong><br/>${formData.status}<br/><br/>
          <strong>${formData.title}</strong><br/>
          ${formData.description}<br/><br/>
          Take a look on it here: ${window.location.origin}${getPath("Topics")}`,
        })
      } catch  {
        showMsg("Error updating the topic", "error")
      }
    } else {
      try {
        await createTopic(formData)
        await sendEmail({
          actor: user?.email,
          subject: `Los tarritos🫙. A topic have been created by ${user?.email}`,
          message: `A topic have been created by <strong>${user?.email}.</strong><br/><br/>
          <strong>Date:</strong><br/>${formData.createdAt} | <strong>Status:</strong><br/>${formData.status}<br/><br/>
          <strong>${formData.title}</strong><br/>
          ${formData.description}<br/><br/>
          Take a look on it here: ${window.location.origin}${getPath("Topics")}`,
        })
      } catch {
        showMsg("Error creating the topic", "error")
      }
    }
    
    showMsg(isEdit ? "Topic updated": "Topic created", "success")
    router.push(getPath("Topics"))
  }

  return (
    <>
      <Headline as="h2" classname="py-8">{isEdit ? "Edit Topic": "New Topic"}</Headline>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        {TOPIC_INPUTS.map((input) => {
          if (input.type === "textarea") {
            return <TextArea
              key={input.label}
              value={formData[ input.name ] as string}
              onChange={(e) => setFormData({ ...formData, [ input.name ]: e.target.value })}
              {...input}
            />
          }
          if (input.type === "select") {
            return <Select
              key={input.label}
              value={formData[ input.name ] as string}
              onChange={(e) => setFormData({ ...formData, [ input.name ]: e.target.value })}
              options={input.options ?? []}
              {...input} />
          }
          return <Input
            key={input.label}
            value={formData[ input.name ] as string}
            onChange={(e) => setFormData({ ...formData, [ input.name ]: e.target.value })}
            {...input}
          />
        })}
        <div className="md:col-span-2 grid gap-4 md:grid-cols-2 mt-4">
          <Button
            text={isEdit ? "Update" : "Create"}
            className={CONFIRM_BTN_CLASSES}
            type="submit"
          />
          <Link
            href={`${getPath("Topics")}`}
            asButton
            className={CANCEL_BTN_CLASSES}
          >Cancel</Link>
        </div>
      </form>
    </>
  )
}

export default TopicForm