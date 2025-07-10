import Calendar from "../../components/Calendar/Calendar"
import "./TimeManagement.css"
import useDateUtils from "../../hooks/useDateUtils"

const TimeManagement = ({onDayClick}) => {
    const {
    currentDate,
    daysInAMonth,
    nextMonth,
    previousMonth,
  } = useDateUtils();

  console.log(onDayClick)
  return (
    <>
      <h3>Ajanhallinta</h3>
      <div className="timemanagement">
        <Calendar
          currentDate={currentDate}
          daysInAMonth={daysInAMonth}
          nextMonth={nextMonth}
          previousMonth={previousMonth}
          onDayClick={onDayClick}
        />
      </div>
    </>

  )
}

export default TimeManagement