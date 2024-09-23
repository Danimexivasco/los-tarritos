import { combine } from "@/utils/combineClassNames"
import { HEADLINE_CLASSES } from "@/utils/constants"

interface HeadlineProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  classname?: string
  children: React.ReactNode
}

const Headline = ({ as: As, classname, children }: HeadlineProps) => {
  return (
    <As className={combine(HEADLINE_CLASSES[ As ], classname)}	>
      {children}
    </As>
  )
}

export default Headline