"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useGetParamId } from "@/hooks/use-get-paramsId"
import { ArrowLeft, FolderGit2, Network, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const DesignToolSidemenu = () => {
  const { projectId } = useGetParamId()
  const currentPath = usePathname()

  const items = [
    {
      title: "Projects Design",
      url: `/projects/${projectId}`,
      icon: FolderGit2,
    },
    {
      title: "Preview Flow",
      url: `/projects/${projectId}/preview`,
      icon: Network,
    },
    {
      title: "Settings",
      url: `/projects/${projectId}/settings`,
      icon: Settings,
    },
    {
      title: "Back",
      url: "/projects",
      icon: ArrowLeft,
    },
  ]

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = item?.url === currentPath
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  )
}

export default DesignToolSidemenu
