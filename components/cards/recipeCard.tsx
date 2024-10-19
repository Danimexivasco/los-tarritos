import React from "react"
import { formatDate } from "@/utils/formatDate"
import { combine } from "@/utils/combineClassNames"
import { NEGATIVE_CARD_CLASSES, NEUTRAL_CARD_CLASSES, POSITIVE_CARD_CLASSES } from "@/utils/constants"
import Headline from "../headline"
import Link from "../link"
import Tag from "../tag"
import ClockIcon from "@/public/icons/clock.svg"

interface CardProps {
  title: string
  href?: string
  className?: string
  tags?: string
  dificulty: "Easy" | "Medium" | "Hard"
  url?: string
  time: number
  createdAt?: Date
}

interface CardContentProps {
  title: string
  tags?: Array<string>
  dificulty: "Easy" | "Medium" | "Hard"
  url?: string
  time: number
  createdAt?: Date
}

const CardContent = ({ title, tags, url, dificulty, time, createdAt }: CardContentProps) => (
  <>
    <div className="flex-1">
      <Headline as="h3" classname="capitalize mb-4 ">{title}</Headline>
      <div className="flex gap-2">
        {tags && tags.length > 0 && (
          tags.map(tag => (
            <Tag
              key={tag}
              text={tag}
              className={combine(
                dificulty === "Easy" && "bg-emerald-500",
                dificulty === "Hard" && "bg-red-500",
              )}
            />
          ))
        )}
      </div>
    </div>
    <div>
      <div className="flex justify-between gap-6 items-center">
        <i className="text-xs">Created at: {formatDate(createdAt as Date)}</i>
        {time && (
          <div className="flex gap-1 items-center">
            <ClockIcon className="w-6 h-6"/> {time} mins
          </div>
        )}
        {/* TODO: Add rating */}
      </div>
      {url && (
        <div onClick={(e) => e.stopPropagation()} className="mt-4">
          <Link href={url} external asButton className={combine(
            dificulty === "Easy" && "bg-emerald-500 hover:bg-emerald-500/80",
            dificulty === "Hard" && "bg-red-500 hover:bg-red-500/80",
          )}>Visit Recipe</Link>
        </div>
      )}
    </div>
  </>
)
const Card = ({ title, href, dificulty, tags, url, time, createdAt, className }: CardProps) => {
  const mapedTags = tags?.split(",").map(el => el.trim()) ?? []
  return href ?(
    <li>
      <Link
        href={href}
        className={combine(
          NEUTRAL_CARD_CLASSES,
          dificulty === "Easy" && POSITIVE_CARD_CLASSES,
          dificulty === "Hard" && NEGATIVE_CARD_CLASSES,
          className
        )}
      >
        <CardContent
          title={title}
          tags={mapedTags}
          url={url}
          dificulty={dificulty}
          time={time}
          createdAt={createdAt}
        />
      </Link>
    </li>
  ) : (
    <li className={combine(
      NEUTRAL_CARD_CLASSES,
      dificulty === "Easy" && POSITIVE_CARD_CLASSES,
      dificulty === "Hard" && NEGATIVE_CARD_CLASSES,
      className
    )}>
      <CardContent
        title={title}
        tags={mapedTags}
        url={url}
        dificulty={dificulty}
        time={time}
        createdAt={createdAt}
      />
    </li>
  )
}

export default Card