import React from "react"
import { NavHeaderComponentProps } from "../header-types"
import { cn } from "@/lib/utils"

const NavMenu = ({ children, className }: NavHeaderComponentProps) => {
  const baseClass = `md:flex items-center gap-4 text-sm`
  return <ul className={cn(baseClass, className)}>{children}</ul>
}

export default NavMenu
