"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useGetCreate } from "@/hooks/use-create-modal"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { projectCreateSchema } from "../schema/project-schemas"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/trpc/client"
import { Loader, Loader2 } from "lucide-react"
import { toast } from "sonner"
type ProjectCreateSchemaType = z.infer<typeof projectCreateSchema>
type ProjectFormPropTypes = {
  close: () => void
}
const CreateProjectForm = () => {
  // *hook
  const { isOpen, setIsOpen, close } = useGetCreate({
    queryLabel: "create-project",
  })

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="flex flex-col dark:bg-neutral-900  dark:text-white border-l-0">
          <SheetHeader>
            <SheetTitle className="dark:text-white">Create Project</SheetTitle>
            <SheetDescription>
              Enter the project details below Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>

          <ProjectForm close={close} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CreateProjectForm

const ProjectForm = ({ close }: ProjectFormPropTypes) => {
  // * service call
  const utils = trpc.useUtils()
  const createProject = trpc.projects.createProject.useMutation()
  const form = useForm<ProjectCreateSchemaType>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  //   * confirm to create
  const onSubmit = (data: ProjectCreateSchemaType) => {
    createProject.mutate(data, {
      onSuccess: (data) => {
        toast.success(data?.message)
        utils.projects.getMany.invalidate()
        close()
      },
      onError(error) {
        toast.error(error.message)
      },
    })
  }

  return (
    <div className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            rules={{
              required: {
                value: true,
                message: "Name is required",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full flex  items-center justify-center"
          >
            {createProject.isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
                <span className="animate-pulse">Creating ...</span>
              </div>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
