"use client"
import React, { useContext, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createActivity, updateActivity } from "@/services/activities"
import { Activity } from "@/types"
import { ACTIVITY_TYPE_OPTIONS, ACTIVITY_STATUS_OPTIONS, ACTIVITY_TYPES, ACTIVITY_STATUS, CANCEL_BTN_CLASSES, CONFIRM_BTN_CLASSES } from "@/utils/constants"
import Button from "@/components/button"
import Select from "@/components/select"
import TextArea from "@/components/textarea"
import Link from "@/components/link"
import { getPath } from "@/utils/getPath"
import Headline from "./headline"
import { showMsg } from "@/utils/showMessage"
import { UserContext } from "./protectedRoute"
import { sendEmail } from "@/utils/sendEmail"

export interface ActivityFormProps {
  activity?: Activity | any
}

const ActivityForm = ({ activity }: ActivityFormProps) => {
  const router = useRouter()
  const { user } = useContext(UserContext);
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
    // TODO: Add loading state during sendEmail
    e.preventDefault()
    if (isEditForm && activity?.id) {
      const updatedData = { ...formData, updatedAt: [ ...(activity?.updatedAt || []), new Date() ] }

      await updateActivity(activity.id, updatedData)

      await sendEmail({
        actor: user?.email,
        subject: `Los tarritos🏺 - An activity have been updated by ${user?.email}`,
        message: `An activity have been updated by <strong>${user?.email}.</strong><br/><br/>
        <strong>Date:</strong><br/>${formData.createdAt}<br/><br/>
        <strong>Type:</strong><br/>${formData.type}<br/><br/>
        <strong>Status:</strong><br/>${formData.status}<br/><br/>
        <strong>Description:</strong><br/>${formData.text}<br/><br/>
        Take a look on it here: ${window.location.origin}${getPath("Random Activities")}?activityType=${formData.type}`,
      })

      router.push(`${getPath("Random Activities")}?activityType=${formData.type}`)
      showMsg("Activity updated", "success")
      return
    }

    try {
      const activityId = await createActivity(formData)

      if(activityId) {
        await sendEmail({
          actor: user?.email,
          subject: `Los tarritos🏺. New activity created by ${user?.email}`,
          message: `New activity created by <strong>${user?.email}.</strong><br/><br/>
          <strong>Date:</strong><br/>${formData.createdAt}<br/><br/>
          <strong>Type:</strong><br/>${formData.type}<br/><br/>
          <strong>Status:</strong><br/>${formData.status}<br/><br/>
          <strong>Description:</strong><br/>${formData.text}<br/><br/>
          Take a look on it here: ${window.location.origin}${getPath("Random Activities")}?activityType=${formData.type}`,
        })
      }
    } catch (error) {
      showMsg("Error creating the activity", "error")
    }

    router.push(`${getPath("Random Activities")}?activityType=${formData.type}`)
    showMsg("Activity created", "success")
  }

  const isEditForm = Boolean(activity)

  return (
    <section>
      <Headline as="h2" classname="py-8">{isEditForm ? "Edit Activity" : "New Activity"}</Headline>
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
            className={CONFIRM_BTN_CLASSES}
            type="submit"
          />
          <Link
            href={`${getPath("Home")}?activityType=${formData.type}`}
            asButton
            className={CANCEL_BTN_CLASSES}
          >Cancel</Link>
        </div>
      </form>
    </section>
  )
}

export default ActivityForm