const TimeEntryPreview = ({ timeEntryDates }) => {
  return (
    <div>
      {timeEntryDates.map((entry, index) => 
        <p key={index}>{entry.project} - {entry.hours}h</p>
      )}
    </div>

  )
}

export default TimeEntryPreview