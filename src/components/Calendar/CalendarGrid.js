import "./CalendarGrid.css"

const CalendarGrid = () => {
  const days = () => {
    const currentDate = new Date().getDate()
    const currentDay = new Date().getDay()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    // Get the number of days in the current month: move to next month and take the last day of the previous month
    const daysInAMonth = new Date(currentYear, currentMonth+1, 0).getDate()
    // Find out which weekday is the first day of the current month
    const viikonpaiva = new Date(currentYear, currentMonth, 1).getDay()
    console.log(currentDate)
    console.log(currentDay)
    console.log(currentMonth)
    console.log(currentYear)
    console.log(daysInAMonth)
    console.log('viikonpäivä '+ viikonpaiva)

    const days = [];
    if (viikonpaiva > 1) {
      for (let i=1; i<viikonpaiva; i++) {
        days.push(<div>tyhjä</div>)
      }
    }
    if (viikonpaiva === 0) {
      for (let i=6; i>viikonpaiva; i--) {
        days.push(<div>tyhjä</div>)
      }
    }
    for (let i = 1; i <= daysInAMonth; i++) {
      days.push(<div key={i} className="grid-square"><p>päivä nro {i}</p></div>)
    }
    return days;
  };

  return (
    <div className="grid">
      {days()}
    </div>
  );
};

export default CalendarGrid;