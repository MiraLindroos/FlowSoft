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

  return {
    currentMonth,
    currentYear,
    daysInAMonth,
    nextMonth,
    previousMonth,
  }
}

export default useDateUtils
