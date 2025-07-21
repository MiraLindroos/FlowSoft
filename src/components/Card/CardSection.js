import "./Card.css"

const CardSection = ({fields}) => {
  return (
    <div className="card-section">
      {fields.map((field, index) =>
      <p key={index} className="card-section-p">{field.label}: {field.value}</p>
      )}
    </div>
  )
}

export default CardSection