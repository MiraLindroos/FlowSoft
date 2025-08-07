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
              {label: "Päivämäärä", value: "20.7."},
              {label: "Mistä", value: travel.from ? travel.from : "Ei lähtöpaikkaa annettu"},
              {label: "Mihin", value: travel.destination ? travel.destination : "Ei kohdetta annettu"},
              {label: "Kilometrit", value: travel.kilometers}
            ]}
          />
        )}
        </Card>
      </div>
      <div className="travel-detail money">
        <Card
          title='Matkan rahat'
          icon='💳'
        > <CardSection
            fields={[
              {label: "Päiväraha", value: "200€"},
              {label: "Kilometrikorvaus", value: "239€"},
            ]}
          />
        </Card>
      </div>
    </div>
  )
}

export default TravelDetail