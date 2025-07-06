import Card from "../../components/Card/Card"
import CardSection from "../../components/Card/CardSection"
import cardColors from "../../theme/cardColors"

const Profile = () => {
  return (
    <div>
      profiili
      <Card
        title="Perustiedot"
        > <CardSection
          fields={[
            {label: "Nimi", value: "Jukka"},
            {label: "Sähköposti", value: "Jukka@flowtec"}
          ]}
        />
      </Card>
      <Card
        title="Tili"
      > <CardSection 
          fields={[
            {label: "Viimeisin kirjautuminen", value: "eilen"},
            {label: "Vaiha salasana", value: "*******"}
          ]}
        />
      </Card>
    </div>
  )
}

export default Profile