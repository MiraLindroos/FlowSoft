import "./CalendarGrid.css"

const CalendarGrid = () => {
  const days = () => {
    const currentDate = new Date().getDate()
    const currentDay = new Date().getDay()
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const daysInAMonth = new Date(currentYear, currentMonth+1, 0).getDate() //0 tarkoittaa edellisen kuukauden vika päivä, siksi month+1
    const viikonpaiva = new Date(currentYear, currentMonth, 1).getDay() //tämän kuukauden eka päivä
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
        console.log('täällä ' + i)
      }
    }
    if (viikonpaiva === 0) {
      for (let i=6; i>viikonpaiva; i--) {
        days.push(<div>tyhjä</div>)
        console.log('täällä ' + i)
      }
    }
    for (let i = 1; i <= daysInAMonth; i++) {
      days.push(<div className="grid-square">päivä nro {i}</div>)
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