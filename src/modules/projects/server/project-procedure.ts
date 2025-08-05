import { db } from "@/db"
import { projects } from "@/db/schema/projects"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { TRPCError } from "@trpc/server"
import { projectCreateSchema } from "../schema/project-schemas"
import { eq } from "drizzle-orm"
import z from "zod"

export const projectRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const { authenticated, clerkUserId } = ctx

    if (!authenticated || !clerkUserId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are Unauthorized please login !!",
      })
    }

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, clerkUserId))

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
        userId: clerkUserId,
      })

      return {
        message: `Project ${name} created successfully !!`,
        data: project,
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { clerkUserId, authenticated } = ctx
      const { projectId } = input

      if (!authenticated || !clerkUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are Unauthorized please login !!",
        })
      }

      const project = await db
        .delete(projects)
        .where(eq(projects.id, projectId))
        .returning()

      const removedItems = project[0]
      return {
        message: `Project ${removedItems.name} created successfully !!`,
        data: removedItems,
      }
    }),
})
