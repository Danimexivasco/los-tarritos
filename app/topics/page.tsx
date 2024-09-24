import Headline from "@/components/headline"
import TopicList from "@/components/topicList"
import React from "react"

const Topics = ({}) => {
  return (
    <>
      <Headline as="h1" classname="mb-8 mt-4">Topics</Headline>
      <TopicList />
    </>
  )
}

export default Topics