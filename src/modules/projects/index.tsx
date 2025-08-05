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
import { CalendarDays, PenTool, Trash, Workflow } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import ProjectCreateButton from "./components/project-create-button"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm-modal"

const Projects = () => {
  const { isLoading, isError, data } = trpc.projects.getMany.useQuery()
  const removeProject = trpc.projects.delete.useMutation()
  const utils = trpc.useUtils()

  const [Dialog, confirmDelete] = useConfirm()

  if (isError) {
    return toast.error(data?.message)
  }

  // * flags
  const isNotEmpty = data?.allProjects?.length !== 0

  // ! remove project handler
  const handleRemoveProject = async (projectId: string) => {
    const confirm = await confirmDelete()
    if (confirm) {
      removeProject.mutate(
        {
          projectId,
        },
        {
          onSuccess(data) {
            toast.success(data?.message)
            utils.projects.getMany.invalidate()
          },
          onError(error) {
            toast.error(error.message)
          },
        }
      )
    }
  }

  if (isNotEmpty) {
    return (
      <div className="grid grid-cols-3 gap-2 ">
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => {
            return <Skeleton key={index} className="w-full h-40 rounded-lg" />
          })}
        {data?.allProjects?.map((template, index) => {
          const createdAt = new Date(template?.createdAt).toLocaleDateString()

          const navigateTo = `/projects/${template?.id}`
          return (
            <Card
              key={index}
              className="border-none hover:shadow-md  min-h-40  justify-between transition-shadow"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-muted text-secondary-foreground size-10 grid place-items-center rounded-lg">
                    <Workflow size={18} />
                  </div>
                  {template?.name}
                </CardTitle>
                <CardDescription>
                  <p className="line-clamp-2">{template.description}</p>
                </CardDescription>
                <CardAction title="Open" className="flex items-center gap-1">
                  <Link href={navigateTo}>
                    <Button
                      variant={"ghost"}
                      className=" p-0 size-7 bg-inherit text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
                    >
                      <PenTool
                        size={18}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
                      />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleRemoveProject(template?.id)}
                    variant={"ghost"}
                    className=" p-0 size-7 bg-inherit text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
                  >
                    <Trash size={18} />
                  </Button>
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

        {isNotEmpty && <ProjectCreateButton type="float" />}

        <Dialog />
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
