import "./Calendar.css"
import DayCell from "./DayCell"

const CalendarGrid = ({daysInAMonth, onDateClick}) => {
  return (
    <div className="grid">
      {daysInAMonth.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          onClick={() => onDateClick(day)}
        />
      ))}
    </div>
  )
}

export default CalendarGrid