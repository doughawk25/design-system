"use server"

import { formSchema, type FormState } from "./form-next-complex-schema"

export async function formAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!result.success) {
    return {
      values: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
      },
      errors: result.error.flatten().fieldErrors as FormState["errors"],
      success: false,
    }
  }

  return { values: undefined, errors: null, success: true }
}
