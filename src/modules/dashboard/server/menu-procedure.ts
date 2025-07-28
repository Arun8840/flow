import { db } from "@/db"
import { menus } from "@/db/schema/menus"
import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import { TRPCError } from "@trpc/server"

export const menusRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const { authenticated, clerkUserId } = ctx

    if (!clerkUserId || !authenticated) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are Unauthorized please login !!",
      })
    }

    const menu = await db.select().from(menus)

    return {
      menu: menu,
      message: "Menu loadded successfully!!",
    }
  }),
})
