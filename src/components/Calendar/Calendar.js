import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import "./Calendar.css"

const Calendar = () => {
  return (
    <div className="calendar">
      <CalendarHeader />
      <CalendarGrid />
    </div>
  )
}

export default Calendar;