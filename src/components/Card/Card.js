import './Card.css'

const Card = ({icon, title, description, children, style}) => {
  return (
    <div className='card' style={style}>
      <div className='card-info'>
        <h3>{icon} {title}</h3>
        <small>{description}</small>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Card