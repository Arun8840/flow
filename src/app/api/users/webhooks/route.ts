import { db } from "@/db"
import { users } from "@/db/schema/users"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import { count, eq } from "drizzle-orm"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET

    if (!SIGNING_SECRET) {
      throw new Error(
        "Error: Please add CLERK_WEBHOOK_SIGNING_SECRET from Clerk Dashboard to .env or .env"
      )
    }
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const eventType = evt.type

    if (eventType === "user.created") {
      const { data } = evt

      // 1. Check if user already exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, data.id))
        .limit(1)

      if (existingUser.length === 0) {
        // 2. Count how many users already exist
        const existingUserCountResult = await db
          .select({ count: count() })
          .from(users)

        const existingUserCount = Number(existingUserCountResult[0].count)

        // 3. Determine role
        const role = existingUserCount < 3 ? "admin" : "client"

        // 4. Insert new user with role
        await db.insert(users).values({
          clerkId: data.id,
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
          role,
        })
      } else {
        console.log("User already exists. Skipping insert.")
      }
    }

    if (eventType === "user.deleted") {
      const { data } = evt

      if (!data.id) {
        return new Response("Missing user id", { status: 400 })
      }
      await db.delete(users).where(eq(users.clerkId, data.id))
    }

    if (eventType === "user.updated") {
      const { data } = evt

      if (!data.id) {
        return new Response("Missing user id", { status: 400 })
      }
      await db
        .update(users)
        .set({
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        })
        .where(eq(users.clerkId, data.id))
    }
    return new Response("Webhook received", { status: 200 })
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error verifying webhook", { status: 400 })
  }
}
