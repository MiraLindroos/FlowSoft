import "./Calendar.css"
import TimeEntryPreview from "./TimeEntryPreview"

const DayCell = ({day, currentDate, timeEntries, onClick}) => {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const fullDate = new Date(year, month, day)

  const timeEntryDates = timeEntries.filter((entry) => {
    return new Date(entry.startTime.seconds * 1000).toDateString() === fullDate.toDateString()
  })
  console.log(timeEntryDates)
  return (
    <div className="grid-square" onClick={onClick}>
      <span className="grid-day">{day}</span>
      <div>
        <TimeEntryPreview timeEntryDates={timeEntryDates}/>
      </div>
    </div>
  )
}

export default DayCell