const TimeEntryPreview = ({ timeEntryDates }) => {
  return (
    <div className="time-entry">
      {timeEntryDates.map((entry, index) => {
        const fullHours = Math.floor(entry.hours)
        const fullMinutes = Math.round((entry.hours - fullHours) * 60)
        return (
          <p key={index}>
            {entry.project} - {fullHours}h {fullMinutes}min
          </p>
        )
      }
      )}
    </div>

  )
}

export default TimeEntryPreview