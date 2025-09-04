import { useAtom } from "jotai"
import { currentDateAtom } from "../jotai/atoms"

const useDateUtils = () => {
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  // Get the number of days in the current month: move to next month and take the last day of the previous month
  const numberOfDays = new Date(currentYear, currentMonth + 1, 0).getDate()
  // Find out which weekday is the first day of the current month
  const dayOfTheWeek = new Date(currentYear, currentMonth, 1).getDay()

  // Array to represent all days in the current month, for calendar display
  const daysInAMonth = []

  // If the week doesn't start on Monday, add empty slots
  // So if first day of the month is wednesday, we need '','', 1 so in the calendar the 1 goes to wednesday
  if (dayOfTheWeek > 1) {
    for (let i = 1; i < dayOfTheWeek; i++) {
      daysInAMonth.push('')
    }
  }
  // If the month starts on Sunday, add 6 empty slots
  if (dayOfTheWeek === 0) {
    for (let i = 6; i > dayOfTheWeek; i--) {
      daysInAMonth.push('')
    }
  }
  // Add the days to the array for example 1-30
  for (let i = 1; i <= numberOfDays; i++) {
    daysInAMonth.push(i)
  }

  // Move to the next month (sets date to the 1st of the next month)
  const nextMonth = () => {
    // prev is the latest currentDate
    // let's create a new Date object for the 1st day of the next month
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  // Move to the previous month (sets date to the 1st of the previous month)
  const previousMonth = () => {
    // prev is the latest currentDate
    // let's create a new Date object for the 1st day of the previous month
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  // Function to convert Date object to 'YYYY-MM-DD' format for input type=date field
  const dateToInputValue = (date) => {
    const year = date.getFullYear()
    // Convert month (0–11) to 1–12, then add a zero in front if needed (e.g. "03")
    const month = String(date.getMonth() + 1).padStart(2, '0') // e.g. month 11 already has two numbers so no zero needed in front
    // Convert day number to string and add a zero in front if needed (e.g. "09")
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return {
    currentMonth,
    currentYear,
    daysInAMonth,
    nextMonth,
    previousMonth,
    dateToInputValue
  }
}

export default useDateUtils
