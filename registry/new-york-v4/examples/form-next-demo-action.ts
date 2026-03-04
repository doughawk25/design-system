"use server"

import { z } from "zod"

export const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

export type FormState = {
  values?: z.infer<typeof formSchema>
  errors: null | Partial<Record<keyof z.infer<typeof formSchema>, string[]>>
  success: boolean
}

export async function formAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = formSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  })

  if (!result.success) {
    return {
      values: {
        title: String(formData.get("title") ?? ""),
        description: String(formData.get("description") ?? ""),
      },
      errors: result.error.flatten().fieldErrors as FormState["errors"],
      success: false,
    }
  }

  return { values: undefined, errors: null, success: true }
}
