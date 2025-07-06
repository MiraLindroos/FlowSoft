import Calendar from "../../components/Calendar/Calendar"
import "./TimeManagement.css"
import useDateUtils from "../../hooks/useDateUtils"

const TimeManagement = () => {
    const {
    currentDate,
    daysInAMonth,
    nextMonth,
    previousMonth,
  } = useDateUtils();
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