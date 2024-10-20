import React from "react"
import { formatDate } from "@/utils/formatDate"
import { combine } from "@/utils/combineClassNames"
import { HARD_RECIPE_CARD_CLASSES, CARD_CLASSES, EASY_RECIPE_CARD_CLASSES, MEDIUM_RECIPE_CARD_CLASSES } from "@/utils/constants"
import Headline from "../headline"
import Link from "../link"
import Tag from "../tag"
import ClockIcon from "@/public/icons/clock.svg"

interface CardProps {
  title: string
  href?: string
  className?: string
  tags?: string
  difficulty: "Easy" | "Medium" | "Hard"
  url?: string
  time?: number | null
  createdAt?: Date
}

interface CardContentProps {
  title: string
  tags?: Array<string>
  difficulty: "Easy" | "Medium" | "Hard"
  url?: string
  time?: number | null
  createdAt?: Date
}

const CardContent = ({ title, tags, url, difficulty, time, createdAt }: CardContentProps) => (
  <>
    <div className="flex-1">
      <Headline as="h3" classname="first-letter:capitalize mb-4">{title}</Headline>
      <div className="flex gap-2 flex-wrap">
        {tags && tags.length > 0 && (
          tags.map(tag => (
            <Tag
              key={tag}
              text={tag}
              className={combine(
                difficulty === "Easy" && "bg-emerald-500",
                difficulty === "Medium" && "!bg-amber-500",
                difficulty === "Hard" && "bg-red-500",
              )}
            />
          ))
        )}
      </div>
    </div>
    <div>
      <div className="flex justify-between gap-2 items-center">
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
            difficulty === "Easy" && "bg-emerald-500 hover:bg-emerald-500/80",
            difficulty === "Medium" && "!bg-amber-500 hover:!bg-amber-500/80",
            difficulty === "Hard" && "bg-red-500 hover:bg-red-500/80",
          )}>Visit Recipe</Link>
        </div>
      )}
    </div>
  </>
)
const Card = ({ title, href, difficulty, tags, url, time, createdAt, className }: CardProps) => {
  const mapedTags = tags?.split(",")?.map(el => el.trim()).filter(Boolean) ?? []
  
  return href ?(
    <li>
      <Link
        href={href}
        className={combine(
          CARD_CLASSES,
          difficulty === "Easy" && EASY_RECIPE_CARD_CLASSES,
          difficulty === "Medium" && MEDIUM_RECIPE_CARD_CLASSES,
          difficulty === "Hard" && HARD_RECIPE_CARD_CLASSES,
          className
        )}
      >
        <CardContent
          title={title}
          tags={mapedTags}
          url={url}
          difficulty={difficulty}
          time={time}
          createdAt={createdAt}
        />
      </Link>
    </li>
  ) : (
    <li className={combine(
      CARD_CLASSES,
      difficulty === "Easy" && EASY_RECIPE_CARD_CLASSES,
      difficulty === "Medium" && MEDIUM_RECIPE_CARD_CLASSES,
      difficulty === "Hard" && HARD_RECIPE_CARD_CLASSES,
      className
    )}>
      <CardContent
        title={title}
        tags={mapedTags}
        url={url}
        difficulty={difficulty}
        time={time}
        createdAt={createdAt}
      />
    </li>
  )
}

export default Card