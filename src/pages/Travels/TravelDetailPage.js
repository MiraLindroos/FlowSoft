import TravelDetail from "../../components/Travels/TravelDetail"
import Button from "../../components/Button/Button"
import { FiArrowLeft } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

const TravelDetailPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button className="go-back" onClick={() => navigate(-1)}><FiArrowLeft /></button>
      <h3 className="travel-title">Matka: matka</h3>
      <Button title={'Muokkaa'} />
      <TravelDetail

      />
    </div>
  )
}

export default TravelDetailPage