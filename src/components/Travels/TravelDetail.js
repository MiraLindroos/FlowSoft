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
        > <CardSection
          fields={[

          ]}
        />
        </Card>
      </div>
      <div className="travel-detail money">
        <Card
          title='Matkan rahat'
          icon='💳'
        > <CardSection
            fields={[

            ]}
          />
        </Card>
      </div>
    </div>
  )
}

export default TravelDetail