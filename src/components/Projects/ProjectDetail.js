import Card from "../Card/Card"
import CardSection from "../Card/CardSection"
import "./Projects.css"

const ProjectDetail = ({project}) => {
  return (
    <div className="project-detail">
      <div className="project-detail info">
        <Card
          title='Projektin tiedot'
          icon='📂'
        > <CardSection
          fields={[
            {label: "Projekti", value: project.name},
            {label: "Alkamispäivä", value: project.startDate ? project.startDate.toDate().toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' }) : 'Ei alkamispäivää annettu'},
            {label: "Loppumispäivä", value: project.endDate ? project.endDate.toDate().toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric' }) : 'Ei loppumispäivää annettu'},
            {label: project.hourRate.length > 0 ? "Tuntihinta" : "Kiinteä hinta", value: project.hourRate.length > 0 ? project.hourRate : project.fixedRate },
            {label: "Muistiinpanot", value: project.memo}
          ]}
        />
        </Card>
      </div>
      <div className="project-detail hours">
        <Card
          title='Projektin tunnit'
          icon='⌚️'
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
          icon='💳'
        > <CardSection
            fields={[
              {label: "Yhteyshenkilö", value: "testitesti"},
              {label: "Viitenumero", value: "liibalaabaluuba"},
              {label: "Operaattori", value: "lorem ipsum...lorem ipsum"},
            ]}
          />
        </Card>
      </div>
    </div>
  )
}

export default ProjectDetail