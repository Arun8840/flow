"use client"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { trpc } from "@/trpc/client"
import { CalendarDays, PenTool } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import ProjectCreateButton from "./components/project-create-button"
import Link from "next/link"

const Projects = () => {
  const { isLoading, isError, data } = trpc.projects.getMany.useQuery()

  if (isError) {
    return toast.error(data?.message)
  }

  // * flags
  const isNotEmpty = data?.allProjects?.length !== 0

  if (isNotEmpty) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => {
            return <Skeleton key={index} className="w-full h-20 rounded-lg" />
          })}
        {data?.allProjects?.map((template, index) => {
          const createdAt = new Date(template?.createdAt).toLocaleDateString()

          const navigateTo = `/projects/${template?.id}`
          return (
            <Card key={index} className="shadow-none hover:shadow">
              <CardHeader>
                <CardTitle>{template?.name}</CardTitle>
                <CardDescription>
                  <p className="line-clamp-3">{template.description}</p>
                </CardDescription>
                <CardAction title="Open">
                  <Link href={navigateTo}>
                    <PenTool className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer" />
                  </Link>
                </CardAction>
              </CardHeader>
              <CardFooter>
                <p
                  title="Created On"
                  className="text-sm text-muted-foreground flex items-center gap-2"
                >
                  <CalendarDays size={18} className="text-muted-foreground" />
                  {createdAt}
                </p>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    )
  }
  return (
    <div className="size-full grid place-items-center">
      <ProjectCreateButton />
    </div>
  )
}

export default Projects
