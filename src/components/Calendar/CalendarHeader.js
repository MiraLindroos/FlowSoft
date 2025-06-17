const CalendarHeader = () => {
  const getMonth = () => {
    const currentMonth = new Date()
    return <p>{currentMonth.toLocaleString('default', {month: 'long'})}</p>
  }
  return (
    <div>
      {getMonth()}
    </div>
  )
}

export default CalendarHeader;