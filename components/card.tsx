import React from "react"
import Link from "./link"
import { formatDate } from "@/utils/formatDate"
import { Points } from "@/types"
import { combine } from "@/utils/combineClassNames"
import { NEGATIVE_CARD_CLASSES, NEUTRAL_CARD_CLASSES, POSITIVE_CARD_CLASSES } from "@/utils/constants"
import Headline from "./headline"

interface CardProps {
  title: string
  href?: string
  description: string
  className?: string
  isBalance?: boolean
  points?: Points
  isPositive?: boolean
  isNegative?: boolean
  createdAt?: Date
}

const CardContent = ({ title, description, isBalance, points, createdAt }: CardProps) => (
  <>
    <div className="flex-1">
      <Headline as="h3" classname="capitalize mb-4 ">{title}</Headline>
      <p>{description}</p>
    </div>
    {isBalance && (
      <div className="flex justify-between gap-4">
        <i className="text-xs">Created at: <br/>{formatDate(createdAt as Date)}</i>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <p>😀</p>
            <p className="text-emerald-500">{points?.good?.length}</p>
          </div>
          <div className="flex gap-2">
            <p>😢</p>
            <p className="text-red-500">{points?.bad?.length}</p>
          </div>
        </div>
      </div>
    )}
  </>
)
const Card = ({ title, description, href, isBalance, points, createdAt, isPositive, isNegative, className }: CardProps) => {
  return href ?(
    <li>
      <Link
        href={href}
        className={combine(
          NEUTRAL_CARD_CLASSES,
          isPositive && POSITIVE_CARD_CLASSES,
          isNegative && NEGATIVE_CARD_CLASSES,
          className
        )}
      >
        <CardContent
          title={title}
          description={description}
          isBalance={isBalance}
          points={points}
          createdAt={createdAt}
        />
      </Link>
    </li>
  ) : (
    <li className={combine(
      NEUTRAL_CARD_CLASSES,
      isPositive && POSITIVE_CARD_CLASSES,
      isNegative && NEGATIVE_CARD_CLASSES,
      className
    )}>
      <CardContent
        title={title}
        description={description}
        isBalance={isBalance}
        points={points}
        createdAt={createdAt}
      />
    </li>
  )
}

export default Card