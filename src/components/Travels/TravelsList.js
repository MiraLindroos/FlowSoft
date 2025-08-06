import { Link } from "react-router-dom"
import { FiTrash } from "react-icons/fi"

const TravelsList = ({travels}) => {
  console.log(travels)
  return (
    <>
      {travels && travels.length > 0 ? (
        <div className="travels-list">
          {travels.map((travel) => (
            <div key={travel.id} className="travel-row">
              <Link>{travel.name}</Link>
              <button><FiTrash /></button>
            </div>
          ))}
        </div>
        ) : <p>Ei matkakuluja</p>
      }
    </>
  )
}

export default TravelsList