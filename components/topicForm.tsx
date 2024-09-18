"use client"
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Topic } from "@/types"
import { createTopic, updateTopic, useSingleTopicData } from "@/services/topics"
import { TOPIC_INPUTS, TOPIC_STATUS } from "@/utils/constants"
import { getPath } from "@/utils/getPath"
import Button from "@/components/button"
import Input from "@/components/input"
import Link from "@/components/link"
import { UserContext } from "@/components/protectedRoute"
import Select from "@/components/select"
import TextArea from "@/components/textarea"

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
    isEdit ? await updateTopic(id as string, { ...formData, updatedAt: new Date() }) : await createTopic(formData)
    router.push(getPath("Topics"))
  }

  return (
    <>
      <h1 className="text-4xl pb-8">{isEdit ? "Edit Topic": "New Topic"}</h1>
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
            className="bg-emerald-500 hover:bg-emerald-700"
            type="submit"
          />
          <Link
            href={`${getPath("Topics")}`}
            asButton
            className="bg-red-500 hover:bg-red-700"
          >Cancel</Link>
        </div>
      </form>
    </>
  )
}

export default TopicForm