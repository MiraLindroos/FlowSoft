import "./Calendar.css"
import DayCell from "./DayCell"

const CalendarGrid = ({daysInAMonth, onDayClick}) => {
  return (
    <div className="grid">
      {daysInAMonth.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          onClick={onDayClick}
        />
      ))}
    </div>
  )
}

export default CalendarGrid