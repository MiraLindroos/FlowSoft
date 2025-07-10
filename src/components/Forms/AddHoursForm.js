import "./Forms.css"
import { useState } from "react"

const AddHoursForm = () => {
  const {
    date,
    start,
    end,
    project,
    travel,
    price
  } = useState("")
  return (
    <form className="form-area">
      <div className="form-item">
        <label>Päivämäärä</label>
        <input type="date" value={date} />
      </div>
      <div className="form-item">
        <label>Aloitusaika</label>
        <input type="time" value={start} />
      </div>
      <div className="form-item">
        <label>Lopetusaika</label>
        <input type="time" value={end} />
      </div>
      <div className="form-item">
        <label>Projekti</label>
        <input type="text" value={project} />
      </div>
      <div className="form-item">
        <label>Kilometrit</label>
        <input type="number" value={travel} />
      </div>
      <div className="form-item">
        <label>Tuntihinta</label>
        <input type="number" value={price} />
      </div>
    </form>
  )
}

export default AddHoursForm