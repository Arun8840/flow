import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"

interface NavProfileProps extends HTMLAttributes<HTMLDivElement> {}
const NavProfile: React.FC<NavProfileProps> = ({ children, className }) => {
  const baseClass = "size-fit"
  return <div className={cn(baseClass, className)}>{children}</div>
}

export default NavProfile
