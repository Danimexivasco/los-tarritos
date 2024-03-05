"use client"
import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createActivity, updateActivity } from "@/services/activities"
import { Activity } from "@/types"
import { ACTIVITY_TYPE_OPTIONS, ACTIVITY_STATUS_OPTIONS, ACTIVITY_TYPES, ACTIVITY_STATUS, ROUTES } from "@/utils/constants"
import Button from "@/components/button"
import Select from "@/components/select"
import TextArea from "@/components/textarea"
import Link from "@/components/link"

export interface ActivityFormProps {
  activity?: Activity | any
}

const ActivityForm = ({ activity }: ActivityFormProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [ formData, setFormData ] = useState<Activity>({
    type: searchParams.get("activityType") || ACTIVITY_TYPES.SHORT,
    status: ACTIVITY_STATUS.TO_DO,
    text: "",
    createdAt: new Date(),
  })
  useEffect(() => {
    if (activity) {
      setFormData(activity)
    }
  }, [ activity ])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isEditForm) {
      setFormData({ ...formData, updatedAt: new Date() })
      await updateActivity(activity?.id || "", formData)
      router.push(`${ROUTES.HOME}?activityType=${formData.type}`)
      return
    }
    await createActivity(formData)
    router.push(`${ROUTES.HOME}?activityType=${formData.type}`)
  }

  const isEditForm = Boolean(activity)

  return (
    <section>
      <h1 className="text-3xl py-8">{isEditForm ? "Edit Activity" : "New Activity"}</h1>
      <form onSubmit={handleFormSubmit} className="grid gap-4 md:grid-cols-2">
        <Select
          options={ACTIVITY_TYPE_OPTIONS}
          label="Type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
        <Select
          options={ACTIVITY_STATUS_OPTIONS}
          label="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        />
        <TextArea
          required
          placeholder='Write here your activity...'
          label="Description"
          value={formData.text}
          className="md:col-span-2"
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        />
        <div className="md:col-span-2 grid gap-4 md:grid-cols-2 mt-4">
          <Button
            text={isEditForm ? "Update Activity" : "Create Activity"}
            className="bg-emerald-500 hover:bg-emerald-700"
            type="submit"
          />
          <Link
            href={`${ROUTES.HOME}?activityType=${formData.type}`}
            asButton
            className="bg-red-500 hover:bg-red-700"
          >Cancel</Link>
        </div>
      </form>
    </section>
  )
}

export default ActivityForm