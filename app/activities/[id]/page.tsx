"use client"
import React from "react"
import { useSingleActivityData } from "@/services/activities"
import ActivityForm from "@/components/activityForm"

export interface ActivityProps {
  params: {
    id: string
  }
}

const Activity = ({ params: { id } }:ActivityProps ) => {
  const [ activity, loading, error ] = useSingleActivityData(id)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Ooops there is some error 🐒</p>
  return activity && typeof activity === "object" && (
    <ActivityForm activity={{ ...activity, id }}/>
  )
}

export default Activity