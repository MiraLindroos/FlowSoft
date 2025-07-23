import CalendarGrid from "./CalendarGrid"
import CalendarHeader from "./CalendarHeader"
import "./Calendar.css"

const Calendar = ({daysInAMonth, nextMonth, previousMonth, onDateClick, onEntryClick}) => {
  return (
    <div className="calendar">
      {/* Calendar header with month navigation */}
      <CalendarHeader
        nextMonth={nextMonth} // Function to go to next month
        previousMonth={previousMonth} // Function to go to previous month
      />
      {/* Calendar grid with days and entries */}
      <CalendarGrid
        daysInAMonth={daysInAMonth} // Array of days (and empty slots) for the current month
        onDateClick={onDateClick} // Handler for clicking a date cell
        onEntryClick={onEntryClick} // Handler for clicking a time entry
      />
    </div>
  )
}

export default Calendar