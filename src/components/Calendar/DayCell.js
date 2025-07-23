import "./Calendar.css"
import TimeEntryPreview from "./TimeEntryPreview"
import { useAtomValue } from "jotai"
import { currentDateAtom } from "../../jotai/atoms"

const DayCell = ({day, onEntryClick, timeEntries, onClick}) => {
  const currentDate = useAtomValue(currentDateAtom)
  // Get year and month from the current date
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  // Create a Date object for this cell's day
  const fullDate = new Date(year, month, day)

  // Filter time entries to only those that match this day
  const timeEntryDates = timeEntries.filter((entry) => {
    // Convert Firestore timestamp to JS Date and compare dates
    return new Date(entry.startTime.seconds * 1000).toDateString() === fullDate.toDateString()
  })

  return (
    <div className="grid-square" onClick={onClick}>
      {/* Display the day number */}
      <span className="grid-day">{day}</span>
      <div>
        {/* Show time entries for this day  */}
        <TimeEntryPreview
          date={fullDate}
          timeEntryDates={timeEntryDates}
          onEntryClick={onEntryClick}
        />
      </div>
    </div>
  )
}

export default DayCell