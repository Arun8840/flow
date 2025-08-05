import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"

const NavProfile: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => {
  const baseClass = "size-fit"
  return <div className={cn(baseClass, className)}>{children}</div>
}

export default NavProfile
