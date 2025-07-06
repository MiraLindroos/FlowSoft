import Card from "../../components/Card/Card"
import CardSection from "../../components/Card/CardSection"
import "./Profile.css"

const Profile = () => {
  return (
    <>
      <h3>Profiili</h3>
      <div className="profile-content">
        <Card
          title="Perustiedot"
          > <CardSection
            fields={[
              {label: "Nimi", value: "Jukka"},
              {label: "Sähköposti", value: "Jukka@flowtec"},
              {label: "Rooli", value: "Käyttäjä"}
            ]}
          />
        </Card>
        <Card
          title="Tili"
        > <CardSection 
            fields={[
              {label: "Viimeisin kirjautuminen", value: "eilen"},
              {label: "Vaihda salasana", value: "*******"}
            ]}
          />
        </Card>
      </div>
    </>
  )
}

export default Profile