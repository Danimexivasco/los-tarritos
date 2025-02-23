"use client"
import { useTopicsData } from "@/services/topics"
import React, { useEffect, useState } from "react"
import Link from "./link"
import { getPath } from "@/utils/getPath"
import { Topic } from "@/types"
import TopicItem from "./topicItem"
import { ITEMS_GAP, TOPIC_STATUS } from "@/utils/constants"
import Headline from "./headline"
import PlusIcon from "@/public/icons/plus.svg"
import { combine } from "@/utils/combineClassNames"

const TopicList = ({}) => {
  const [ topicsByStatus, setTopicsByStatus ] = useState(null)
  const [ topics, loading, error, snapshot ] = useTopicsData()
  
  useEffect(() => {
    if (Array.isArray(topics) && topics?.length > 0) {
      const _topicsWithIds = topics.map((topic, index) => {
        return { id: snapshot?.docs[ index ].id, ...topic };
      });
      const _topicsByStatus = _topicsWithIds.reduce((acc, item) => {
        if (!acc[ item.status ]) acc[ item.status ] = [];
        acc[ item.status ].push(item);
        return acc;
      }, {});
      setTopicsByStatus(_topicsByStatus)
    }
  }, [ topics, snapshot?.docs?.length ])

  if (loading) {
    return <p>Loading...</p>
  }

  if (Array.isArray(topics) && topics?.length <= 0) {
    return (
      <>
        <p className=" mb-4">Ooops... There are no topics yet</p>
        <Link
          href={getPath("New Topic")}
          asButton
          className={"font-bold bg-emerald-500 hover:bg-emerald-700 w-full flex items-center justify-center rounded p-4 text-white my-8 md:w-fit"}
        ><PlusIcon className="w-5 h-5 mr-2"/> Create first topic</Link>
      </>
    )
  }
  return topicsByStatus && (
    <>
      <Link
        href={`${getPath("New Topic")}`}
        className={"font-bold bg-emerald-500 hover:bg-emerald-700 w-full flex items-center justify-center rounded p-4 text-white my-8 md:w-fit"}
      ><PlusIcon className="w-5 h-5 mr-2"/>NEW TOPIC</Link>
      {Object.entries(topicsByStatus)
        ?.sort(([ statusA ], [ statusB ]) =>
          TOPIC_STATUS.indexOf(statusA as "To do" | "Done") - TOPIC_STATUS.indexOf(statusB as "To do" | "Done"))
        ?.map(([ status, topics ]) => {
          const topicsArray = topics as Topic[];
          return (
            <div key={status} className="mb-8">
              <Headline as="h2" classname="font-bold text-lg leading-9">{status}</Headline>
              <hr className="border-cyan-500/40 pb-6"/>
              <ul className={combine("grid", ITEMS_GAP)}>
                {topicsArray?.map((topic: Topic) => <TopicItem key={topic.id} {...topic}/>)}
              </ul>
            </div>
          )
        })}
    </>
  )
}

export default TopicList