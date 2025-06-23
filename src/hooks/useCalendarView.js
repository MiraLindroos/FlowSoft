import { useState } from "react";

const useCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  // Get the number of days in the current month: move to next month and take the last day of the previous month
  const numberOfDays = new Date(currentYear, currentMonth + 1, 0).getDate()
  // Find out which weekday is the first day of the current month
  const dayOfTheWeek = new Date(currentYear, currentMonth, 1).getDay()

  const daysInAMonth = [];
  if (dayOfTheWeek > 1) {
    for (let i = 1; i < dayOfTheWeek; i++) {
      daysInAMonth.push('')
    }
  }
  if (dayOfTheWeek === 0) {
    for (let i = 6; i > dayOfTheWeek; i--) {
      daysInAMonth.push('')
    }
  }
  for (let i = 1; i <= numberOfDays; i++) {
    daysInAMonth.push(i)
  }

  const nextMonth = () => {
    // prev is the latest currentDate
    // let's create a new Date object for the 1st day of the next month
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const previousMonth = () => {
    // prev is the latest currentDate
    // let's create a new Date object for the 1st day of the previous month
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  return {
    currentDate,
    daysInAMonth,
    nextMonth,
    previousMonth,
  }
}

export default useCalendarView;
