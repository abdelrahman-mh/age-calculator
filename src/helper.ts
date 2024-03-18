import { ValidFormData, AgeOutput } from './types'

export function calculateAge({ day, month, year }: ValidFormData): AgeOutput {
  const age: AgeOutput = {}

  const today = new Date()
  const birthDate = new Date(year, month - 1, day)

  if (birthDate > today) return age

  const diff = today.getTime() - birthDate.getTime()
  const ageDate = new Date(diff)

  const ageYears = ageDate.getUTCFullYear() - 1970
  const ageMonths = ageDate.getUTCMonth()
  const ageDays = ageDate.getUTCDate() - 1

  if (ageYears > 0) {
    age.years = ageYears
  }
  if (ageMonths > 0 || ageYears > 0) {
    age.months = ageMonths
  }
  if (ageDays > 0 || ageMonths > 0 || ageYears > 0) {
    age.days = ageDays
  }

  return age
}
