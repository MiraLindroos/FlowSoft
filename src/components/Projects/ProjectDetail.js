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
            {label: "Projekti käynnissä", value: project.onGoing ? "Kyllä" : "Ei"},
            {label: project.hourRate ? "Tuntihinta" : project.fixedRate ? "Kiinteä hinta" : "Hintaa ei ole merkattu", value: project.hourRate ? project.hourRate : project.fixedRate ? project.fixedRate : 0 },
            {label: "Muistiinpanot", value: project.memo ? project.memo : "Ei muistiinpanoja"}
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
              {label: "Tunnit tässä kuussa", value: "ei vielä oikeeta dataa"},
              {label: "tunnit yhteensä", value: project.hours.toFixed(2)},
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
              {label: "Yhteyshenkilö", value: "ei vielä oikeeta dataa"},
              {label: "Viitenumero", value: "ei vielä oikeeta data"},
              {label: "Operaattori", value: "ei vielä oikeeta data"},
            ]}
          />
        </Card>
      </div>
    </div>
  )
}

export default ProjectDetail