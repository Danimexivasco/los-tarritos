import React from "react"
import TopicForm from "@/components/topicForm"

interface ActivityProps {
  params: {
    id: string
  }
}

const TopicDetail = ({ params: { id } }: ActivityProps) => <TopicForm id={id} />

export default TopicDetail