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

  return (
    <div className="calendar-header">
      <button className="header-button"onClick={clickLeft}>{'<<'}</button>
      {getMonth()}
      <button className="header-button" onClick={clickRight}>{'>>'}</button>
    </div>
  )
}

export default CalendarHeader;