import z from "zod"

export const projectCreateSchema = z.object({
  name: z.string().nonempty("required !"),
  description: z.string().nullable().optional(),
})
