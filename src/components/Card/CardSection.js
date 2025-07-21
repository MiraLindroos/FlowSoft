import "./Card.css"

const CardSection = ({fields}) => {
  return (
    <div className="card-section">
      {/* Map through fields and display them as <p> element */}
      {fields.map((field, index) =>
      // Display field label and value
      <p key={index} className="card-section-p">{field.label}: {field.value}</p>
      )}
    </div>
  )
}

export default CardSection