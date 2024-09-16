import React from "react"
import { default as NextLink } from "next/link";
import { GENERAL_BUTTON_CLASSES } from "@/utils/constants";
import { combine } from "@/utils/combineClassNames";

export interface LinkProps {
  href: string
  asButton?: boolean
  children: React.ReactNode
  className?: string
}

const Link = ({ href, asButton=false, children, className }: LinkProps) => {
  return <NextLink
    href={href}
    className={combine(!asButton ? "text-cyan-500" : GENERAL_BUTTON_CLASSES, className)}
  >{children}</NextLink>
}

export default Link