import Card from "../Card/Card"
import CardSection from "../Card/CardSection"
import "./Projects.css"

const ProjectDetail = ({project}) => {
  return (
    <div className="project-detail">
      <div className="project-detail info">
        <Card
          title='Projektin tiedot'
        > <CardSection
          fields={[
            {label: "Projekti", value: project.name},
            {label: "Alkamispäivä", value: project.startDate.toDate().toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' })},
            {label: "Loppumispäivä", value: project.endDate.toDate().toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric' })},
            {label: "Lisätty", value: project.created.toDate().toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric' })},
            {label: project.hourRate.length > 0 ? "Tuntihinta" : "Kiinteä hinta", value: project.hourRate.length > 0 ? project.hourRate : project.fixedRate },
            {label: "Muistiinpanot", value: project.memo}
          ]}
        />
        </Card>
      </div>
      <div className="project-detail hours">
        <Card
          title='Projektin tunnit'
        > <CardSection
            fields={[
              {label: "Tunnit tässä kuussa", value: "20"},
              {label: "tunnit yhteensä", value: project.hours},
            ]}
          />
        </Card>
      </div>
      <div className="project-detail else">
        <Card
          title='Laskutustiedot'
        > <CardSection
            fields={[
              {label: "Muuta tietoo", value: "testitesti"},
              {label: "testi", value: "liibalaabaluuba"},
              {label: "testi 3", value: "lorem ipsum...lorem ipsum...lorem ipsum..."},
            ]}
          />
        </Card>
      </div>
    </div>
  )
}

export default ProjectDetail