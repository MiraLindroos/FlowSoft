import "./Calendar.css"

const DayCell = ({day, onClick}) => {
  return (
    <div className="grid-square" onClick={onClick}>
      <span className="grid-day">{day}</span>
    </div>
  )
}

export default DayCell