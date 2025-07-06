import Calendar from "../../components/Calendar/Calendar"
import "./TimeManagement.css"
import useCalendarView from "../../hooks/useCalendarView"

const TimeManagement = () => {
    const {
    currentDate,
    daysInAMonth,
    nextMonth,
    previousMonth,
  } = useCalendarView();
  return (
    <>
      <h3>Ajanhallinta</h3>
      <div className="timemanagement">
        <Calendar
          currentDate={currentDate}
          daysInAMonth={daysInAMonth}
          nextMonth={nextMonth}
          previousMonth={previousMonth} 
        />
      </div>
    </>

  )
}

export default TimeManagement