import "./Calendar.css"
import DayCell from "./DayCell"
import { useAtomValue } from "jotai"
import { currentDateAtom } from "../../jotai/atoms"

const CalendarGrid = ({daysInAMonth, onDateClick, onEntryClick, timeEntries}) => {
  const currentDate = useAtomValue(currentDateAtom)
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  return (
    <div className="grid">
      {/* Render a DayCell for each day in the current month */}
      {daysInAMonth.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          onEntryClick={onEntryClick}
          timeEntries={timeEntries}
          // Handle click on a day cell
          onClick={() => {
            // Only handle clicks for valid days (not empty cells)
            if (day !== '') {
              // Create a Date object for the clicked day
              const fullDate = new Date(year, month, day)
              // Trigger the onDateClick callback with the selected date
              onDateClick(fullDate)
            }
          }}
        />
      ))}
    </div>
  )
}

export default CalendarGrid