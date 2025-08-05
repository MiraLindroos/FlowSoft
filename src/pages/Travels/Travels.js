import TravelsList from "../../components/Travels/TravelsList"
import useTravels from "../../hooks/useTravels"

const Travels = () => {
  const { travels } = useTravels()
  console.log(travels)
  return (
    <div>
      <h3>Matkakulut</h3>
      <TravelsList />
    </div>
  )
}

export default Travels