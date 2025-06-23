import "./Calendar.css"

const CalendarGrid = (props) => {
  const currentDate = props.currentDate
  const daysInAMonth = props.daysInAMonth

  const click = () => {
    console.log('päivää klikattu')
  }

  const showDays = daysInAMonth.map((day, index) => {
    return <div key={index} className="grid-square" onClick={click}><p>{day}</p></div>
  })

  return (
    <div className="grid">
      {showDays}
    </div>
  );
};

export default CalendarGrid;