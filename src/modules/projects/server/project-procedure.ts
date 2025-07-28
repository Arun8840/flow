import { db } from "@/db"
import { projects } from "@/db/schema/projects"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { TRPCError } from "@trpc/server"
import { projectCreateSchema } from "../schema/project-schemas"

export const projectRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const { authenticated, clerkUserId } = ctx

    if (!authenticated || !clerkUserId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are Unauthorized please login !!",
      })
    }

    const project = await db.select().from(projects)

    return {
      allProjects: project,
      message: "Projects loaded successfully !!",
    }
  }),

  createProject: protectedProcedure
    .input(projectCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const { authenticated, clerkUserId } = ctx

      // * payload
      const { name, description } = input

      if (!authenticated || !clerkUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are Unauthorized please login !!",
        })
      }

      const project = await db.insert(projects).values({
        name: name,
        description: description,
      })

      return {
        message: `Project ${name} created successfully !!`,
        data: project,
      }
    }),
})
