import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import "./Calendar.css"
import useCalendarView from "../../hooks/useCalendarView";

const Calendar = () => {
  const {
    currentDate,
    daysInAMonth,
    nextMonth,
    previousMonth,
  } = useCalendarView();
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