import R from 'ramda'
import { FieldName, FieldValues } from 'react-hook-form/dist/types/form'
import { ManualFieldError } from '../types/member'

type Errors = Record<string, unknown>

// interface CreateFormErrors {
//   <TFieldValues extends FieldValues>(
//     errors: Errors,
//     prefix: string
//   ): ManualFieldError<Record<FieldName<TFieldValues>, string>>[]
// }

function createFormErrors<TFieldValues extends FieldValues>(
  errors: Errors,
  prefix = ''
): ManualFieldError<Record<FieldName<TFieldValues>, string>>[] {
  const sanitizedErrors = R.omit(['__typename', 'message'])(errors)
  const x = R.map((k: string) => {
    if (typeof sanitizedErrors[k] === 'string') {
      if (R.isNil(sanitizedErrors.index)) {
        return {
          name: prefix ? `${prefix}.${k}` : k,
          type: 'manual',
          message: sanitizedErrors[k],
        }
      } else {
        if (k === 'error') {
          return {
            name: prefix ? `${prefix}.${sanitizedErrors.index}` : k,
            type: 'manual',
            message: sanitizedErrors[k],
          }
        } else {
          return {
            name: prefix ? `${prefix}.${sanitizedErrors.index}.${k}` : k,
            type: 'manual',
            message: sanitizedErrors[k],
          }
        }
      }
    } else if (Array.isArray(sanitizedErrors[k])) {
      return R.map((e: Record<string, string>) => {
        if (R.isNil(e.index)) {
          return createFormErrors(e, prefix ? `${prefix}.${k}` : k)
        } else {
          return createFormErrors(
            e,
            prefix ? `${prefix}.${sanitizedErrors.index}.${k}` : k
          )
        }
      })(sanitizedErrors[k] as Record<string, string>[])
    } else {
      if (R.isNil(sanitizedErrors.index)) {
        return createFormErrors(
          sanitizedErrors[k] as Record<string, string>,
          prefix ? `${prefix}.${k}` : k
        )
      } else {
        return createFormErrors(
          sanitizedErrors[k] as Record<string, string>,
          prefix ? `${prefix}.${sanitizedErrors.index}.${k}` : k
        )
      }
    }
  })(R.keys(sanitizedErrors))

  return R.flatten(x) as ManualFieldError<
    Record<FieldName<TFieldValues>, string>
  >[]
}

export default createFormErrors
