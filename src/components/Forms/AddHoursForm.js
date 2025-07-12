import "./Forms.css"
import { useState } from "react"

const AddHoursForm = () => {
  const {
    start,
    end,
    project,
    travel,
    price,
    memo
  } = useState("")

  return (
    <form className="form-area">
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
      <div className="form-item">
        <label>Muistiinpanot</label>
        <textarea value={memo} />
      </div>
    </form>
  )
}

export default AddHoursForm