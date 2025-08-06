import List from "../../components/List/List"
import useTravels from "../../hooks/useTravels"
import Button from "../../components/Button/Button"
import "./Travels.css"

const Travels = () => {
  const { travels } = useTravels()

  return (
<div className="travels-view">
      <h3>Matkakulut</h3>
      <div className="travel-buttons">
        <Button title={'LISÄÄ UUSI'} />
      </div>
      <div className="travels-list">
        <List items={travels} path={'Matka'} />
      </div>
    </div>
  )
}

export default Travels