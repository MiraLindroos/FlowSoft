import "./Calendar.css"
import DayCell from "./DayCell"

const CalendarGrid = ({currentDate, daysInAMonth, onDateClick, onEntryClick, timeEntries}) => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  return (
    <div className="grid">
      {daysInAMonth.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          currentDate={currentDate}
          onEntryClick={onEntryClick}
          timeEntries={timeEntries}
          onClick={() => {
            if (day !== '') {
              const fullDate = new Date(year, month, day)
              onDateClick(fullDate)
            }
          }}
        />
      ))}
    </div>
  )
}

export default CalendarGrid