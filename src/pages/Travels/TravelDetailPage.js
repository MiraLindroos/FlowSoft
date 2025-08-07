import TravelDetail from "../../components/Travels/TravelDetail"
import Button from "../../components/Button/Button"
import { FiArrowLeft } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"
import useTravelDetail from "../../hooks/useTravelDetail"

const TravelDetailPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const { travel } = useTravelDetail(id)
  return (
    <div>
      <button className="go-back" onClick={() => navigate(-1)}><FiArrowLeft /></button>
      {travel && <h3 className="travel-title">Matka: {travel.from} - {travel.destination}</h3>}
      <Button title={'Muokkaa'} />
      <TravelDetail travel={travel}/>
    </div>
  )
}

export default TravelDetailPage