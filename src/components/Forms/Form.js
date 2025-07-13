import "./Forms.css"
import { useFormContext } from "react-hook-form"

const Form = ({fields}) => {
  const { register } = useFormContext()
  return (
    <form className="form-area" >
      {fields.map((field, index) => 
        <div className="form-item" key={index}>
          <label>{field.label}</label>
          {field.type==="select" ? (
            <select required={field.required}>
              <option value="">Valitse projekti</option>
              {field.options.map((option, index) => 
                <option {...register(`${option.name}`)} key={index}>
                  {option.name}
                </option>
              )}
            </select>
          ) : field.type==="textarea" ? (
            <textarea {...register(`${field.name}`)} required={field.required} />
          ) : (
            <input {...register(`${field.name}`)} type={field.type} required={field.required} /> 
          )}
        </div>
      )}
    </form>
  )
}

export default Form