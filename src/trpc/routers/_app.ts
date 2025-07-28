import { createTRPCRouter, protectedProcedure } from "../init"
import { db } from "@/db"
import { users } from "@/db/schema/users"
import { menusRouter } from "@/modules/dashboard/server/menu-procedure"
import { projectRouter } from "@/modules/projects/server/project-procedure"
import { TRPCError } from "@trpc/server"
import { eq } from "drizzle-orm"

export const appRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const { clerkUserId: userId, authenticated } = ctx

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User ID not found in session",
      })
    }
    const currentUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, userId)) // or `users.id` if you're using internal user ids
      .limit(1)

    return currentUser[0] ?? null
  }),
  menu: menusRouter,
  projects: projectRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
