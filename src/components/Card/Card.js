import './Card.css'
import cardColors from "../../theme/cardColors"

const Card = ({icon, title, description, children, variant = "default"}) => {

  const styles = cardColors[variant] || cardColors.default
  return (
    <div className='card' style={styles}>
      <div className='card-info'>
        <h3>{icon} {title}</h3>
        <small>{description}</small>
      </div>
      <div className='card-content'>
        {children}
      </div>
    </div>
  )
}

export default Card