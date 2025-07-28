import React from "react"
import { NavLinkProps } from "../header-types"
import Link from "next/link"
import { cn } from "@/lib/utils"

const NavLink = ({ href, children, className }: NavLinkProps) => {
  const baseClass = "block px-4 py-2 hover:bg-secondary rounded"
  return (
    <Link href={href} className={cn(baseClass, className)}>
      {children}
    </Link>
  )
}

export default NavLink
