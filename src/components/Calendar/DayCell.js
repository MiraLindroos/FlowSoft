import "./Calendar.css"

const DayCell = (props) => {
  const day = props.day
  const click = props.onClick

  return (
    <div className="grid-square" onClick={click}>
      <span className="grid-day">{day}</span>
    </div>
  );
};

export default DayCell;