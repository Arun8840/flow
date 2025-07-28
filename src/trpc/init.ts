import { auth } from "@clerk/nextjs/server"
import { initTRPC, TRPCError } from "@trpc/server"
import { cache } from "react"
import superjson from "superjson"

export const createTRPCContext = cache(async () => {
  const { userId, isAuthenticated } = await auth()
  return { clerkUserId: userId, authenticated: isAuthenticated }
})

export type Context = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
})

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      auth: {
        clerkUserId: ctx.clerkUserId,
        authenticated: ctx.authenticated,
      },
    },
  })
})

// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory

export const baseProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
