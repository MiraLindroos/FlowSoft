import "./Forms.css"
import { useFormContext } from "react-hook-form"

const Form = ({fields}) => {
  // useFormContext allows access to the form methods provided by FormProvider
  // Register allows to register inputs and apply validation rules to React Hook Form
  // The register function returns props like name, onChange etc. which is why we need to spread it like this {...register()}
  const { register } = useFormContext() // Retrieve all hook methods

  return (
    <form className="form-area" >
      {/* Go through given fields and display them */}
      {fields.map((field, index) => 
        <div className="form-item" key={index}>
          {/* Display the label and if the field is required show * next to the label */}
          <label>{field.label} {field.required && <span>*</span>}</label>
          {/* If field type is select */}
          {field.type==="select" ? (
            // Dropdown for selecting a project
            <select {...register(`${field.name}`, { required: field.required })}>
              <option value="">Valitse projekti</option>
              {/* Display fields options */}
              {field.options.map((option, index) => 
                <option key={index} value={JSON.stringify(option)}>
                  {option.name}
                </option>
              )}
            </select>
            // If field type is textarea
          ) : field.type==="textarea" ? (
            // Multiline text field
            <textarea {...register(`${field.name}`, { required: field.required })} />
          ) : (
            // If field type is other than select or textarea
            <input 
              {...register(`${field.name}`, { required: field.required })}
              type={field.type}
              // If field type is time, set the step to be 30minutes
              // and the min and max to be 06 and 20:30
              // If field type is number set the min to be 0
              step={field.type === "time" ? "1800" : undefined}
              min={field.type === "time" ? "06:00" : field.type === "number" ? "0" : undefined}
              max={field.type === "time" ? "20:30" : undefined}
              />
          )}
        </div>
      )}
      <small>* merkatut kentät ei voi olla tyhjiä</small>
    </form>
  )
}

export default Form