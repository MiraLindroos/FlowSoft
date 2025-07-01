const CalendarHeader = (props) => {
  const nextMonth = props.nextMonth
  const previousMonth = props.previousMonth
  const getMonth = () => {
    const currentDate = props.currentDate
    return <p>{currentDate.toLocaleString('default', {month: 'long'})}</p>
  }
  const clickLeft = () => {
    previousMonth()
  }
  const clickRight = () => {
    nextMonth()
  }

  const weekdays = ['ma', 'ti', 'ke', 'to', 'pe', 'la', 'su']

  return (
    <>
      <div className="calendar-header">
        <button className="header-button" onClick={clickLeft}>{'<<'}</button>
        {getMonth()}
        <button className="header-button" onClick={clickRight}>{'>>'}</button>
      </div>
      <div className="calendar-weekdays">
        {weekdays.map(day => (
          <span className="calendar-weekday" key={day}>{day}</span>
        ))}
      </div>
    </>
  )
}

export default CalendarHeader