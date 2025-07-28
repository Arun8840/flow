import { HTMLAttributes } from "react"

export interface NavHeaderComponentProps
  extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface NavLinkProps extends HTMLAttributes<HTMLLinkElement> {
  href: string
  children: React.ReactNode
}
