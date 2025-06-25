import "./Calendar.css"
import DayCell from "./DayCell";

const CalendarGrid = ({daysInAMonth}) => {

  const click = (day) => {
    console.log(`Klikattiin päivää: ${day}`);
  };

  return (
    <div className="grid">
      {daysInAMonth.map((day, index) => (
        <DayCell
          key={index}
          day={day}
          onClick={() => click(day)}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;