import Link from "@/components/link"
import TopicList from "@/components/topicList"
import { getPath } from "@/utils/getPath"
import React from "react"

const Topics = ({}) => {
  return (
    <>
      <h1 className="text-4xl mb-8 font-bold">Topics</h1>
      <Link
        href={`${getPath("New Topic")}`}
        className={"font-bold bg-emerald-500 hover:bg-emerald-700 w-full flex items-center justify-center rounded p-4 text-white my-8"}
      >NEW TOPIC ➕</Link>
      <TopicList />
    </>
  )
}

export default Topics