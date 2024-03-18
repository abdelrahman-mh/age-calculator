export interface FormData {
  day: number | undefined
  month: number | undefined
  year: number | undefined
}
export type ValidFormData = {
  [K in keyof FormData]: number
}

export type PossibleFelids = 'day' | 'month' | 'year'

export type ErrorFields = Partial<Record<keyof FormData, ErrorMessage<PossibleFelids>>>

export interface ValidationResult {
  isValid: boolean
  errors: ErrorFields
}

export type ErrorMessage<T extends PossibleFelids = PossibleFelids> =
  | 'This field is required'
  | (T extends PossibleFelids ? `Must be a valid ${T}` : never)
  | 'Must be in the past'
  | 'Must be a valid date'

export type AgeOutput = { days?: number; months?: number; years?: number }
