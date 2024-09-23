import Headline from "@/components/headline"
import Link from "@/components/link"
import TopicList from "@/components/topicList"
import { getPath } from "@/utils/getPath"
import React from "react"

const Topics = ({}) => {
  return (
    <>
      <Headline as="h1" classname="mb-8 mt-4">Topics</Headline>
      <Link
        href={`${getPath("New Topic")}`}
        className={"font-bold bg-emerald-500 hover:bg-emerald-700 w-full flex items-center justify-center rounded p-4 text-white my-8"}
      >NEW TOPIC ➕</Link>
      <TopicList />
    </>
  )
}

export default Topics