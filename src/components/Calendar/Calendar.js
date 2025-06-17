import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import "./Calendar.css"
import useCalendar from "./useCalendar";

const Calendar = () => {
  const {
    currentDate,
    currentMonth,
    currentYear,
    daysInAMonth,
  } = useCalendar();
  return (
    <div className="calendar">
      <CalendarHeader />
      <CalendarGrid
        currentDate={currentDate}
        daysInAMonth={daysInAMonth}
      />
    </div>
  )
}

export default Calendar;