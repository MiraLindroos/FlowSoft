import "./Forms.css"
import { useState } from "react"

const Form = ({fields}) => {
  return (
    <form className="form-area">
      {fields.map((field, index) => 
        <div className="form-item" key={index}>
          <label>{field.label}</label>
          {field.type==="select" ? (
            <select value={field.value}>
              <option value="">Valitse projekti</option>
              {field.options.map((option, index) => 
                <option key={index} value={field.value}>
                  {option.name}
                </option>
              )}
            </select>
          ) : field.type==="textarea" ? (
            <textarea value={field.value} />
          ) : (
            <input type={field.type} value={field.value} /> 
          )}
        </div>
      )}
    </form>
  )
}

export default Form