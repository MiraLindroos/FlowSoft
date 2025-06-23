import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import "./Calendar.css"
import useCalendar from "./useCalendar";

const Calendar = () => {
  const {
    currentDate,
    daysInAMonth,
    nextMonth,
    previousMonth,
  } = useCalendar();
  return (
    <div className="calendar">
      <CalendarHeader nextMonth={nextMonth} previousMonth={previousMonth} currentDate={currentDate}/>
      <CalendarGrid
        currentDate={currentDate}
        daysInAMonth={daysInAMonth}
      />
    </div>
  )
}

export default Calendar;