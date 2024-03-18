

const generateFutureYear = (): number => {
  const currentYear = new Date().getFullYear()
  return currentYear + Math.floor(Math.random() * 10) + 1 // from +1 to +10
}

const generateDateWithInvalidDay = { day: 30, month: 2, year: 2023 }

const generateFutureDate = (): Date => {
  const currentDate = new Date()
  const futureDate = new Date(currentDate)
  futureDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 10) + 1) // from +1 Day to +10 Days
  return futureDate
}

const generatePastDate = (): Date => {
  const currentDate = new Date()
  const randomYears = Math.floor(Math.random() * 101)
  const randomMonths = Math.floor(Math.random() * 12)
  const randomDays = Math.floor(Math.random() * 28) + 1 // to keep every thing save

  const validDate = new Date(currentDate.getFullYear() - randomYears, randomMonths, randomDays)

  return validDate
}

export { generateFutureYear, generateDateWithInvalidDay, generateFutureDate, generatePastDate }
