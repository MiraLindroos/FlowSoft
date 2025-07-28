import Card from "../../components/Card/Card"
import CardSection from "../../components/Card/CardSection"
import "./Profile.css"
import useUserInfo from "../../hooks/useUserInfo"

const Profile = () => {
  const { userInfo } = useUserInfo()

  return (
    <>
      <h3>Profiili</h3>
      { userInfo ? (
        <div className="profile-content">
          <Card
            title="Perustiedot"
            > <CardSection
              fields={[
                {label: "Nimi", value: userInfo.name},
                {label: "Sähköposti", value: userInfo.email},
                {label: "Rooli", value: userInfo.role}
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
      ) : <div>Ladataan...</div>
      }
    </>
  )
}

export default Profile