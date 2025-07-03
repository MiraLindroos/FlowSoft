import './Statistics.css'

const StatisticsCard = ({icon, title, description, children}) => {
  return (
    <div className='statistics-card'>
    <div className='card-info'>
      <h3>{icon} {title}</h3>
      <small>{description}</small>
    </div>
    <div>{children}</div>
    </div>
  )
}

export default StatisticsCard