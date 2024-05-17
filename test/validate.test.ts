/* eslint-disable @typescript-eslint/no-explicit-any */
import validateDate, { invalidMessage, requiredMessage, pastMessage, invalidDate } from '../src/utils/validate'
import { generateDateWithInvalidDay, generateFutureYear, generatePastDate, generateFutureDate } from './helper'

describe('validateDate function', () => {
  test('should return valid result for a valid date', () => {
    const validDate = generatePastDate()
    const result = validateDate({ day: validDate.getDate(), month: validDate.getMonth() + 1, year: validDate.getFullYear() })
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({})
  })
  test('should return valid result for date in past for just one day', () => {
    const date = new Date()
    const result = validateDate({ day: date.getDate() - 1, month: date.getMonth() + 1, year: date.getFullYear() })
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({})
  })

  test('should return errors for missing inputs', () => {
    const result = validateDate({ day: undefined, month: undefined, year: undefined })
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual({ day: requiredMessage(), month: requiredMessage(), year: requiredMessage() })
  })

  test('should return errors for invalid input if not a number', () => {
    const result = validateDate({ day: 'abc' as any, month: 'abc' as any, year: 'abc' as any })
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual({ day: invalidMessage('day'), month: invalidMessage('month'), year: invalidMessage('year') })
  })

  test('should return errors for invalid inputs if bigger than expected values', () => {
    const futureYear = generateFutureYear()
    const result = validateDate({ day: 32, month: 13, year: futureYear })
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual({ day: invalidMessage('day'), month: invalidMessage('month'), year: pastMessage() })
  })

  test('should return errors for invalid date if equal 0 or less than 0', () => {
    const result = validateDate({ day: 0, month: 0, year: 0 })
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual({ day: invalidMessage('day'), month: invalidMessage('month'), year: invalidMessage('year') })

    const result2 = validateDate({ day: -1, month: -3, year: -2024 })
    expect(result2.isValid).toBe(false)
    expect(result2.errors).toEqual({ day: invalidMessage('day'), month: invalidMessage('month'), year: invalidMessage('year') })
  })

  test('should return errors for invalid day if bigger than maxDaysInMonth', () => {
    const dateWithInvalidDay = generateDateWithInvalidDay
    const result = validateDate(dateWithInvalidDay)
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual({ day: invalidDate() })
  })

  test('should return errors for a date in the future', () => {
    const futureDate = generateFutureDate()
    const result = validateDate({ day: futureDate.getDate(), month: futureDate.getMonth() + 1, year: futureDate.getFullYear() })
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual({ year: pastMessage() })
  })
})
