import { cn } from "@/lib/utils"
import React from "react"

const AuthLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const baseClass = `w-full h-screen grid place-items-center border border-black`
  return <section className={cn(baseClass, className)}>{children}</section>
}

export default AuthLayout
