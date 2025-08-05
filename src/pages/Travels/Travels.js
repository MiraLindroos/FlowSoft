import TravelsList from "../../components/Travels/TravelsList"
import useTravels from "../../hooks/useTravels"

const Travels = () => {
  const { travels } = useTravels()
  console.log(travels)
  return (
    <>
      <h3>Matkakulut</h3>
      {travels && travels.length > 0 ? (
        <TravelsList />
      ) : <p>Ei matkakuluja</p>
      }
    </>
  )
}

export default Travels