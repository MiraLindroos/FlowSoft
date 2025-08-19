import Card from "../Card/Card"
import CardSection from "../Card/CardSection"
import ProjectHours from "./ProjectHours"
import "./Projects.css"

const ProjectDetail = ({project, totalHours, price, start, end, onChange}) => {
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
            {label: project.hourRate ? "Tuntihinta" : project.fixedRate ? "Kiinteä hinta" : "Hintaa ei ole merkattu", value: project.hourRate ? `${project.hourRate} €` : project.fixedRate ? `${project.fixedRate} €` : 0 },
            {label: "Laskettu hinta (Alv 0)", value: project.hourRate ? project.hourRate * project.hours : project.fixedRate ? (project.fixedRate / (project.hours === 0 ? 1 : project.hours)).toFixed(2) : "Ei hintaa" },
            {label: "Laskettu hinta (Alvillinen)", value: project.hourRate ? (project.hourRate * project.hours) * 1.25 : project.fixedRate ? (project.fixedRate * 1.25).toFixed(2) : "Ei hintaa" },
            {label: "Muistiinpanot", value: project.memo ? project.memo : "Ei muistiinpanoja"}
          ]}
        />
        </Card>
      </div>
      <div className="project-detail hours">
        <Card
          title='Projektin tunnit & hinta'
          icon='⌚️'
        > <ProjectHours start={start} end={end} onChange={onChange} />
          <CardSection
            fields={[
              {label: start && end ? 
                `Aikavälillä ${start.toLocaleDateString('fi-Fi', {day: 'numeric', month: 'numeric'})} - ${end.toLocaleDateString('fi-Fi', {day: 'numeric', month: 'numeric'})} tehdyt tunnit`
                : 'Tunnit tässä kuussa',
                value: start && end ? `${totalHours} h` : 'ei oikeeta dataa'},
              {label: "hinta", value: price ? price : 'Ei laskettua hintaa'},
              {label: "Kaikki tehdyt tunnit yhteensä", value: `${project.hours.toFixed(1)} h`},
            ]}
          />
        </Card>
      </div>
      <div className="project-detail billing">
        <Card
          title='Laskutustiedot'
          icon='💳'
        > <CardSection
            fields={[
              {label: "Yhteyshenkilö", value: project.contact ? project.contact : "Ei yhteyshenkilöä"},
              {label: "Viitenumero", value: project.reference ? project.reference : "Ei viitenumeroa"},
              {label: "Operaattori", value: project.operator ? project.operator : "Ei operaattoria"},
            ]}
          />
        </Card>
      </div>
    </div>
  )
}

export default ProjectDetail