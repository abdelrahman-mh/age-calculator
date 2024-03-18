import { FormData, ValidationResult, ErrorMessage, PossibleFelids } from './types'

export const requiredMessage = (): ErrorMessage => 'This field is required'
export const invalidMessage = (field: PossibleFelids): ErrorMessage<PossibleFelids> => `Must be a valid ${field}`
export const pastMessage = (): ErrorMessage => 'Must be in the past'
export const invalidDate = (): ErrorMessage => 'Must be a valid date'

const validateDate = (date: FormData): ValidationResult => {
  const currentDate = new Date()
  const errors: ValidationResult['errors'] = {}

  // Year Check
  if (date.year === undefined) {
    errors.year = requiredMessage()
  } else if (!Number.isInteger(date.year) || date.year < 1) {
    errors.year = invalidMessage('year')
  } else if (date.year > currentDate.getFullYear()) {
    errors.year = pastMessage()
  }

  // Month Check
  if (date.month === undefined) {
    errors.month = requiredMessage()
  } else if (!Number.isInteger(date.month) || date.month < 1 || date.month > 12) {
    errors.month = invalidMessage('month')
  }

  // Day Check
  if (date.day === undefined) {
    errors.day = requiredMessage()
  } else if (!Number.isInteger(date.day) || date.day < 1 || date.day > 31) {
    errors.day = invalidMessage('day')
  }

  if (Object.keys(errors).length === 0) {
    const maxDaysInMonth = new Date(date.year!, date.month!, 0).getDate()

    if (date.day! > maxDaysInMonth) {
      errors.day = invalidDate();
    }
    const selectedDate = new Date(date.year!, date.month! - 1, date.day)
    if (selectedDate > currentDate) {
      errors.year = pastMessage()
    }
  }

  const isValid = Object.keys(errors).length === 0

  return {
    isValid,
    errors,
  }
}

export default validateDate
