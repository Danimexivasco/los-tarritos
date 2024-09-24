"use client"
import React, { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore";
import { useSearchParams } from "next/navigation"
import { useAuthState } from "@/services/auth";
import { updateActivity, useActivitiesData } from "@/services/activities";
import { combine } from "@/utils/combineClassNames";
import { ACTIVE_TAB_CLASSES, ACTIVITY_STATUS, ACTIVITY_TYPES, BG_DONE, BG_IN_PROGRESS, BG_TO_DO, GENERAL_TAB_CLASSES, INACTIVE_TAB_CLASSES } from "@/utils/constants";
import { showMsg } from "@/utils/showMessage";
import ActivityItem from "./activity";
import Button from "@/components/button";
import Link from "@/components/link";
import { getPath } from "@/utils/getPath";
import Headline from "../headline";
import PlusIcon from "@/public/icons/plus.svg";

const ActivitiesWrapper = ({}) => {
  const searchParams = useSearchParams()
  const [ activeTab, setActiveTab ] = useState(searchParams.get("activityType") || ACTIVITY_TYPES.SHORT);
  const [ activitiesWithIds, setActivitiesWithIds ] = useState<Array<DocumentData>>([]);
  // TODO: Refactor activities to just and object with key as type {short: [], medium: [], large: []}
  const [ shortActivities, setShortActivities ] = useState<Array<DocumentData>>([]);
  const [ mediumActivities, setMediumActivities ] = useState<Array<DocumentData>>([]);
  const [ largeActivities, setLargeActivities ] = useState<Array<DocumentData>>([]);
  const [ user, loading, error ] = useAuthState()
  
  const [ activities, loadingActivities, errorActivities, snapshot ] = useActivitiesData()

  useEffect(() => {
    if (activities && Array.isArray(activities)) {
      // Map over the activities array to include the doc ids
      const _activitiesWithIds = activities?.map((activity, index) => {
        return { id: snapshot?.docs[ index ].id, ...activity };
      });
      setActivitiesWithIds(_activitiesWithIds)
    }
  }, [ activities, snapshot?.docs?.length ])

  useEffect(() => {
    if (activitiesWithIds && Array.isArray(activitiesWithIds)) {
      setShortActivities(activitiesWithIds.filter(activity => activity.type === ACTIVITY_TYPES.SHORT))
      setMediumActivities(activitiesWithIds.filter(activity => activity.type === ACTIVITY_TYPES.MEDIUM))
      setLargeActivities(activitiesWithIds.filter(activity => activity.type === ACTIVITY_TYPES.LARGE))
    }
  }, [ activitiesWithIds ])

  const setTabClasses = (tabName: String = ACTIVITY_TYPES.SHORT) => {
    return combine(GENERAL_TAB_CLASSES,
      activeTab === tabName
        ? ACTIVE_TAB_CLASSES
        : INACTIVE_TAB_CLASSES
    )
  }

  const getActivitiesByType = (): Array<DocumentData> | [] => {
    if (!activities || !Array.isArray(activities)) return []
    switch(activeTab) {
    case ACTIVITY_TYPES.SHORT:
      return shortActivities
    case ACTIVITY_TYPES.MEDIUM:
      return mediumActivities
    case ACTIVITY_TYPES.LARGE:
      return largeActivities
    default:
      return []
    }
  }

  const getRandomActivity = async () => {
    // Get a random activity from the TO_DO activities and put it in progress
    const todoActivities = getActivitiesByType()?.filter(activity => activity.status === ACTIVITY_STATUS.TO_DO)
    if (!todoActivities || !Array.isArray(todoActivities)) {
      return showMsg("Something went wrong", "error")
    }
    if (todoActivities?.length === 0) return showMsg("There are no TODO activities", "error")
    const randomIndex = Math.floor(Math.random() * todoActivities?.length)
    const randomActivity = todoActivities?.[ randomIndex ]
    await updateActivity(randomActivity?.id, { ...randomActivity, status: ACTIVITY_STATUS.IN_PROGRESS })
  }
  
  return user && (
    <section>
      <div className="grid grid-cols-3 gap-5">
        <Button
          text="🍕 Short"
          isTab
          className={setTabClasses(ACTIVITY_TYPES.SHORT)}
          onClick={() => setActiveTab(ACTIVITY_TYPES.SHORT)}
        />
        <Button
          text="🚐 Medium"
          isTab
          className={setTabClasses(ACTIVITY_TYPES.MEDIUM)}
          onClick={() => setActiveTab(ACTIVITY_TYPES.MEDIUM)}
        />
        <Button
          text="🚀 Large"
          isTab
          className={setTabClasses(ACTIVITY_TYPES.LARGE)}
          onClick={() => setActiveTab(ACTIVITY_TYPES.LARGE)}
        />
      </div>
      <div className="grid gap-4 md:flex pt-6 ">
        <Link
          href={`${getPath("New Activity")}?activityType=${activeTab}`}
          className={"font-bold bg-emerald-500 hover:bg-emerald-700 w-full flex items-center justify-center rounded p-4 text-white"}
        ><PlusIcon className="w-5 h-5 mr-2"/>New Activity</Link>
        <Button
          text="🧙🏼‍♂️ Random Activity"
          disabled={(getActivitiesByType()?.filter(activity => (activity.type === activeTab && activity.status === ACTIVITY_STATUS.IN_PROGRESS))?.length ?? 1) > 0}
          className={"font-bold !bg-amber-700 hover:!bg-amber-900"}
          onClick={getRandomActivity}
        />
      </div>
      { loadingActivities ? (<p className="mt-10">Loading...</p>) :(
        Array.isArray(activities) && activities?.length > 0 &&
          <div
            className="mt-10 grid gap-8"
          >
            {getActivitiesByType()?.some(activity => activity.status === ACTIVITY_STATUS.IN_PROGRESS) && (
              <div>
                <Headline as="h2" classname="font-bold text-lg leading-9">In Progress</Headline>
                <hr className="border-cyan-500/40 pb-6"/>
                <div className="grid gap-2">
                  {getActivitiesByType()?.filter(activity => activity.status === ACTIVITY_STATUS.IN_PROGRESS).map(activity =>
                    <ActivityItem key={activity.id} activity={activity} className={BG_IN_PROGRESS}/>
                  )}
                </div>
              </div>
            )}
            {getActivitiesByType()?.some(activity => activity.status === ACTIVITY_STATUS.TO_DO) && (
              <div>
                <Headline as="h2" classname="font-bold text-lg leading-9">To do</Headline>
                <hr className="border-cyan-500/40 pb-6"/>
                <div className="grid gap-2">
                  {getActivitiesByType()?.filter(activity => activity.status === ACTIVITY_STATUS.TO_DO).map(activity =>
                    <ActivityItem key={activity.id} activity={activity} className={BG_TO_DO}/>
                  )}
                </div>
              </div>
            )}
            {getActivitiesByType()?.some(activity => activity.status === ACTIVITY_STATUS.DONE) && (
              <div>
                <Headline as="h2" classname="font-bold text-lg leading-9">Done</Headline>
                <hr className="border-cyan-500/40 pb-6"/>
                <div className="grid gap-2">
                  {getActivitiesByType()?.filter(activity => activity.status === ACTIVITY_STATUS.DONE)?.map(activity =>
                    <ActivityItem key={activity.id} activity={activity} className={BG_DONE}/>
                  )}
                </div>
              </div>
            )}
          </div>
      )
      }
    </section>
  )
}

export default ActivitiesWrapper