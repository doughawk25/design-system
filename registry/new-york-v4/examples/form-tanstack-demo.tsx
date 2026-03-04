"use client"

import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/new-york-v4/ui/field"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
})

export function FormTanstackDemo() {
  const form = useForm({
    defaultValues: { title: "", description: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => console.log(value),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="grid max-w-md gap-4"
    >
      <FieldGroup>
        <form.Field name="title">
          {(field) => (
            <Field data-invalid={!!field.state.meta.errors?.length}>
              <FieldLabel htmlFor="ts-title">Title</FieldLabel>
              <Input
                id="ts-title"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={!!field.state.meta.errors?.length}
              />
              <FieldDescription>Bug report title.</FieldDescription>
              {field.state.meta.errors?.[0] && (
                <FieldError>{field.state.meta.errors[0]}</FieldError>
              )}
            </Field>
          )}
        </form.Field>
        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="ts-desc">Description</FieldLabel>
              <Textarea
                id="ts-desc"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                rows={4}
              />
            </Field>
          )}
        </form.Field>
      </FieldGroup>
      <Button type="submit">Submit</Button>
    </form>
  )
}
