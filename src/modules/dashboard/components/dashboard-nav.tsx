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
  const { isLoading } = trpc.getUser.useQuery()

  if (isLoading) {
    return <Skeleton className="w-full h-10 rounded-none" />
  }

  return (
    <>
      <Nav className="px-4 bg-white dark:bg-inherit">
        <Nav.Logo className="flex items-center gap-1">
          {showSidebarTrigger && <SidebarTrigger />}
          <i className="bg-gradient-to-tl from-red-500 via-pink-500 to-blue-500 bg-clip-text text-transparent font-semibold p-1 text-lg">
            Flow
          </i>
        </Nav.Logo>

        <Nav.Menu>
          <li>
            <DarkModeSwitcher />
          </li>
          <li>
            <Nav.Profile>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Nav.Profile>
          </li>
        </Nav.Menu>
      </Nav>
    </>
  )
}

export default DashboardNav
