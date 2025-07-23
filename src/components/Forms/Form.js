import "./Forms.css"
import { useFormContext } from "react-hook-form"

const Form = ({fields}) => {
  const { register } = useFormContext()

  return (
    <form className="form-area" >
      {fields.map((field, index) => 
        <div className="form-item" key={index}>
          <label>{field.label} {field.required && <span>*</span>}</label>
          {field.type==="select" ? (
            <select {...register(`${field.name}`, { required: field.required })}>
              <option value="">Valitse projekti</option>
              {field.options.map((option, index) => 
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              )}
            </select>
          ) : field.type==="textarea" ? (
            <textarea {...register(`${field.name}`, { required: field.required })} />
          ) : (
            <input {...register(`${field.name}`, { required: field.required })} type={field.type} />
          )}
        </div>
      )}
      <small>* merkatut kentät ei voi olla tyhjiä</small>
    </form>
  )
}

export default Form