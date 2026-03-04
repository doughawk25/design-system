"use client"

import { useActionState } from "react"
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
import { formAction, type FormState } from "./form-next-demo-action"

const initialState: FormState = {
  values: undefined,
  errors: null,
  success: false,
}

export function FormNextDemo() {
  const [formState, formActionFn, pending] = useActionState(
    formAction,
    initialState
  )
  const errors = formState.errors ?? {}

  return (
    <form action={formActionFn} className="grid max-w-md gap-4">
      <FieldGroup>
        <Field data-invalid={!!errors.title?.length}>
          <FieldLabel htmlFor="title">Bug Title</FieldLabel>
          <Input
            id="title"
            name="title"
            defaultValue={formState.values?.title}
            disabled={pending}
            aria-invalid={!!errors.title?.length}
            placeholder="Login button not working on mobile"
            autoComplete="off"
          />
          <FieldDescription>
            Provide a concise title for your bug report.
          </FieldDescription>
          {errors.title && <FieldError>{errors.title[0]}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.description?.length}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            name="description"
            defaultValue={formState.values?.description}
            disabled={pending}
            aria-invalid={!!errors.description?.length}
            placeholder="Describe the bug..."
            rows={4}
          />
          <FieldDescription>
            Description must be 20-100 characters.
          </FieldDescription>
          {errors.description && (
            <FieldError>{errors.description[0]}</FieldError>
          )}
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
}
