import React from "react"
import { NavHeaderComponentProps } from "../header-types"
import { cn } from "@/lib/utils"

const NavLogo = ({ children, className }: NavHeaderComponentProps) => {
  const baseClass = "size-fit"
  return <div className={cn(baseClass, className)}>{children}</div>
}

export default NavLogo
