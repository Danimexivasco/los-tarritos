import Link from "@/components/link"
import TopicList from "@/components/topicList"
import { getPath } from "@/utils/getPath"
import React from "react"

const Topics = ({}) => {
  return (
    <>
      <h1 className="text-4xl my-8">Topics</h1>
      <Link
        href={`${getPath("New Topic")}`}
        className={"bg-emerald-500 hover:bg-emerald-700 w-full flex items-center justify-center rounded p-4 text-white my-8"}
      >New Topic ➕</Link>
      <TopicList />
    </>
  )
}

export default Topics