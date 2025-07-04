import CalendarGrid from "./CalendarGrid"
import CalendarHeader from "./CalendarHeader"
import "./Calendar.css"

const Calendar = ({currentDate, daysInAMonth, nextMonth, previousMonth}) => {
  return (
    <div className="calendar">
      <CalendarHeader
        nextMonth={nextMonth}
        previousMonth={previousMonth}
        currentDate={currentDate}
      />
      <CalendarGrid
        currentDate={currentDate}
        daysInAMonth={daysInAMonth}
      />
    </div>
  )
}

export default Calendar