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
import { formAction, type FormState } from "./form-next-complex-action"

const initialState: FormState = {
  values: undefined,
  errors: null,
  success: false,
}

export function FormNextComplex() {
  const [formState, formActionFn, pending] = useActionState(
    formAction,
    initialState
  )
  const errors = formState.errors ?? {}

  return (
    <form action={formActionFn} className="grid max-w-md gap-4">
      <FieldGroup>
        <Field data-invalid={!!errors.name?.length}>
          <FieldLabel htmlFor="complex-name">Name</FieldLabel>
          <Input
            id="complex-name"
            name="name"
            defaultValue={formState.values?.name}
            disabled={pending}
            aria-invalid={!!errors.name?.length}
          />
          {errors.name && <FieldError>{errors.name[0]}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.email?.length}>
          <FieldLabel htmlFor="complex-email">Email</FieldLabel>
          <Input
            id="complex-email"
            name="email"
            type="email"
            defaultValue={formState.values?.email}
            disabled={pending}
            aria-invalid={!!errors.email?.length}
          />
          {errors.email && <FieldError>{errors.email[0]}</FieldError>}
        </Field>
        <Field data-invalid={!!errors.message?.length}>
          <FieldLabel htmlFor="complex-message">Message</FieldLabel>
          <Textarea
            id="complex-message"
            name="message"
            defaultValue={formState.values?.message}
            disabled={pending}
            aria-invalid={!!errors.message?.length}
            rows={4}
          />
          <FieldDescription>At least 10 characters.</FieldDescription>
          {errors.message && <FieldError>{errors.message[0]}</FieldError>}
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  )
}
