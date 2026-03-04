"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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

type FormValues = z.infer<typeof formSchema>

export function FormRHFDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "" },
  })

  return (
    <form
      onSubmit={form.handleSubmit((data) => console.log(data))}
      className="grid max-w-md gap-4"
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.title}>
          <FieldLabel htmlFor="rhf-title">Title</FieldLabel>
          <Input
            id="rhf-title"
            {...form.register("title")}
            aria-invalid={!!form.formState.errors.title}
          />
          <FieldDescription>Bug report title.</FieldDescription>
          {form.formState.errors.title && (
            <FieldError>{form.formState.errors.title.message}</FieldError>
          )}
        </Field>
        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="rhf-desc">Description</FieldLabel>
          <Textarea id="rhf-desc" {...form.register("description")} rows={4} />
        </Field>
      </FieldGroup>
      <Button type="submit">Submit</Button>
    </form>
  )
}
