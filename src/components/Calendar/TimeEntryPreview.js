const TimeEntryPreview = ({ date, timeEntryDates, onEntryClick }) => {
  return (
    <div className="time-entry">
      {timeEntryDates.map((entry, index) => {
        const fullHours = Math.floor(entry.hours)
        const fullMinutes = Math.round((entry.hours - fullHours) * 60)
        return (
          <p
            key={index}
            onClick={(e) => {
              // Prevent parent event from triggering (DayCell.js onClick)
              e.stopPropagation()
              onEntryClick(date, entry)
              console.log('klik!')
            }}>
            {entry.project} - {fullHours}h {fullMinutes}min
          </p>
        )
      }
      )}
    </div>

  )
}

export default TimeEntryPreview