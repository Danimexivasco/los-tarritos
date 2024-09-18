"use client"
import React from "react"
import { useSingleActivityData } from "@/services/activities"
import ActivityForm from "@/components/activityForm"
import { Activity as ActivityType } from "@/types"

export interface ActivityProps {
  params: {
    id: string
  }
}

const Activity = ({ params: { id } }:ActivityProps ) => {
  const [ activity, loading, error ] = useSingleActivityData(id)
  const activityObject = activity as ActivityType

  if (loading) return <p>Loading...</p>
  if (error) return <p>Ooops there is some error 🐒</p>
  return activity && (
    <ActivityForm activity={{ ...activityObject, id }}/>
  )
}

export default Activity