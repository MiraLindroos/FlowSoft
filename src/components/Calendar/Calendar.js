import CalendarGrid from "./CalendarGrid"
import CalendarHeader from "./CalendarHeader"
import "./Calendar.css"

const Calendar = ({currentDate, daysInAMonth, nextMonth, previousMonth, onDateClick, onEntryClick, timeEntries}) => {
  return (
    <div className="calendar">
      {/* Calendar header with month navigation */}
      <CalendarHeader
        nextMonth={nextMonth} // Function to go to next month
        previousMonth={previousMonth} // Function to go to previous month
        currentDate={currentDate} // Currently selected date
      />
      {/* Calendar grid with days and entries */}
      <CalendarGrid
        currentDate={currentDate}
        daysInAMonth={daysInAMonth} // Array of days (and empty slots) for the current month
        onDateClick={onDateClick} // Handler for clicking a date cell
        onEntryClick={onEntryClick} // Handler for clicking a time entry
        timeEntries={timeEntries} // Array of time entries for the month
      />
    </div>
  )
}

export default Calendar