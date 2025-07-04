import './Card.css'

const Card = ({icon, title, description, children}) => {
  return (
    <div className='card'>
    <div className='card-info'>
      <h3>{icon} {title}</h3>
      <small>{description}</small>
    </div>
    <div>{children}</div>
    </div>
  )
}

export default Card