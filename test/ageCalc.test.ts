import { calculateAge } from '../src/helper'

describe('calculateAge function', () => {
  test('should calculate age correctly for today', () => {
    const today = new Date()
    expect(calculateAge({ day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() })).toEqual({})
  })

  test('should calculate age correctly for past dates', () => {
    const pastDate = new Date('1990-05-15')
    const expectedAge = { years: expect.any(Number), months: expect.any(Number), days: expect.any(Number) }
    expect(calculateAge({ day: pastDate.getDate(), month: pastDate.getMonth() + 1, year: pastDate.getFullYear() })).toEqual(expectedAge)
  })

  test('handle leap years', () => {
    const leapYearDate = new Date('2000-02-29')
    const expectedAge = { years: expect.any(Number), months: expect.any(Number), days: expect.any(Number) }
    expect(calculateAge({ day: leapYearDate.getDate(), month: leapYearDate.getMonth() + 1, year: leapYearDate.getFullYear() })).toEqual(expectedAge)
  })

  test('should calculate age correctly for future dates', () => {
    const futureDate = new Date('2050-12-31')
    expect(calculateAge({ day: futureDate.getDate(), month: futureDate.getMonth() + 1, year: futureDate.getFullYear() })).toEqual({})
  })

  test('should handle invalid dates gracefully', () => {
    const invalidDate = { day: 31, month: 2, year: 2024 }
    const age = calculateAge(invalidDate)
    expect(age).not.toEqual({ years: 0, months: 0, days: 0 })
  })

  test('should handle edge case of December 31st', () => {
    const december31stDate = new Date('1999-12-31')
    const expectedAge = { years: expect.any(Number), months: expect.any(Number), days: expect.any(Number) }
    expect(calculateAge({ day: december31stDate.getDate(), month: december31stDate.getMonth() + 1, year: december31stDate.getFullYear() })).toEqual(expectedAge)
  })

  test('should handle edge case of February 29th in non-leap years', () => {
    const nonLeapYearDate = new Date('2023-02-28')
    const expectedAge = { years: expect.any(Number), months: expect.any(Number), days: expect.any(Number) }
    expect(calculateAge({ day: nonLeapYearDate.getDate() + 1, month: 2, year: nonLeapYearDate.getFullYear() })).toEqual(expectedAge)
  })
})
