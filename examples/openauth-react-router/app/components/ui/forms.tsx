import { type OTPInputProps, REGEXP_ONLY_DIGITS } from 'input-otp'
import React, { useId } from 'react'
import { cn } from '../../lib/utils'
import { Input } from './input'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp'
import { Label } from './label'

export type ListOfErrors = Array<string | null | undefined> | null | undefined

export function ErrorList({
  id,
  errors,
  className,
}: {
  errors?: ListOfErrors
  id?: string
  className?: string
}) {
  const errorsToRender = errors?.filter(Boolean)
  if (!errorsToRender?.length) return null
  return (
    <ul id={id} className={cn('flex flex-col gap-1', className)}>
      {errorsToRender.map((e) => (
        <li key={`${id}-${e}`} className="text-sm text-destructive">
          {e}
        </li>
      ))}
    </ul>
  )
}

export function Field({
  labelProps,
  inputProps,
  errors,
  className,
  description,
}: {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
  errors?: ListOfErrors
  className?: string
  description?: string
}) {
  const fallbackId = React.useId()
  const id = inputProps.id ?? fallbackId
  const errorId = errors?.length ? `${id}-error` : undefined
  return (
    <div className={className}>
      {!!labelProps && <Label htmlFor={id} {...labelProps} />}
      <div className="mt-2">
        <Input
          id={id}
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          {...inputProps}
        />
      </div>
      <div className="mt-1 px-3 text-sm empty:hidden">
        {errorId ? (
          <ErrorList id={errorId} errors={errors} />
        ) : description ? (
          <p className="text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  )
}

// date picker field using the ./date-picker component
export const OTPField = React.forwardRef<
  HTMLInputElement,
  {
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
    inputProps: Partial<OTPInputProps & { render: never }>
    errors?: ListOfErrors
    className?: string
  }
>(({ labelProps, inputProps, errors, className }, ref) => {
  const fallbackId = useId()
  const id = inputProps.id ?? fallbackId
  const errorId = errors?.length ? `${id}-error` : undefined
  return (
    <div className={className}>
      {!!labelProps && <Label htmlFor={id} {...labelProps} />}
      <InputOTP
        pattern={REGEXP_ONLY_DIGITS}
        maxLength={6}
        ref={ref}
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        {...inputProps}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="px-4 py-3 text-center">
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
    </div>
  )
})
OTPField.displayName = 'OTPField'
