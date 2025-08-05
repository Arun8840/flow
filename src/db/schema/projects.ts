import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { users } from "./users"

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(), // project id can stay uuid
  userId: text("userId")
    .notNull()
    .references(() => users.clerkId),
  name: text("name").notNull(),
  description: text("description").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
