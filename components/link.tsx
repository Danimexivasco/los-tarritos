import React from "react"
import { default as NextLink } from "next/link";
import { GENERAL_BUTTON_CLASSES } from "@/utils/constants";
import { combine } from "@/utils/combineClassNames";

export interface LinkProps {
  href: string
  asButton?: boolean
  children: React.ReactNode
  external?: boolean
  className?: string
}

const Link = ({ href, asButton=false, children, external=false, className }: LinkProps) => {
  if (external) {
    return <a
      href={href}
      target="_blank"
      className={combine(!asButton ? "text-cyan-500" : GENERAL_BUTTON_CLASSES, className)}
    >
      {children}
    </a>
  }
  return <NextLink
    href={href}
    className={combine(!asButton ? "text-cyan-500" : GENERAL_BUTTON_CLASSES, className)}
  >{children}</NextLink>
}

export default Link