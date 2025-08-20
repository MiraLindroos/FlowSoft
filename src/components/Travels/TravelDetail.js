import Card from "../Card/Card"
import CardSection from "../Card/CardSection"
import "./Travels.css"

const TravelDetail = ({travel}) => {
  return (
    <div className="travel-detail">
      <div className="travel-detail info">
        <Card
          title='Matkan tiedot'
          icon='🚙'
        > {travel && (
          <CardSection
            fields={[
              {label: "Päivämäärä", value: travel.date.toDate().toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' })},
              {label: "Projektille", value: travel.project},
              {label: "Mistä", value: travel.from ? travel.from : "Ei lähtöpaikkaa annettu"},
              {label: "Mihin", value: travel.destination ? travel.destination : "Ei kohdetta annettu"},
              {label: "Kilometrit", value: `${travel.kilometers} km`},
              {label: "Muistiinpanot", value: travel.memo ? travel.memo : "Ei muistiinpanoja"}
            ]}
          />
        )}
        </Card>
      </div>
      <div className="travel-detail money">
        <Card
          title='Matkan rahat'
          icon='💳'
        > {travel && (
          <CardSection
            fields={[
              {label: "Päiväraha", value: travel.travelRate ? `${travel.travelRate} €` : "Ei kilometrihintaa annettu"},
              {label: "Kilometrikorvaus", value: "ei oikeeta dataa"},
            ]}
          />
        )}
        </Card>
      </div>
    </div>
  )
}

export default TravelDetail