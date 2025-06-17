import "./Calendar.css"

const CalendarGrid = (props) => {
  const currentDate = props.currentDate
  const daysInAMonth = props.daysInAMonth

  const showDays = daysInAMonth.map((day, index) => {
    return <div key={index} className="grid-square"><p>päivä nro {day}</p></div>
  })

  return (
    <div className="grid">
      {showDays}
    </div>
  );
};

export default CalendarGrid;