"use client"
import { Nav } from "@/components/nav-bar/ui/nav-header"
import DarkModeSwitcher from "@/components/ui/dark-mode-switcher"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { trpc } from "@/trpc/client"
import { SignedIn, UserButton } from "@clerk/nextjs"
import React from "react"

interface DashboardNavProps {
  showSidebarTrigger?: boolean
}
const DashboardNav: React.FC<DashboardNavProps> = ({
  showSidebarTrigger = false,
}) => {
  const { data: user, isLoading } = trpc.getUser.useQuery()

  if (isLoading) {
    return <Skeleton className="w-full h-10 rounded-none" />
  }

  return (
    <>
      <Nav className="px-4">
        <Nav.Logo className="flex items-center gap-1">
          {showSidebarTrigger && <SidebarTrigger />}
          <h1 className="capitalize font-medium">{user?.role}</h1>
        </Nav.Logo>

        <Nav.Menu>
          <li>
            <DarkModeSwitcher />
          </li>
        </Nav.Menu>

        <Nav.Profile>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Nav.Profile>
      </Nav>
    </>
  )
}

export default DashboardNav
