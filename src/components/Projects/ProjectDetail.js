import Card from "../Card/Card"
import CardSection from "../Card/CardSection"
import ProjectHours from "./ProjectHours"
import "./Projects.css"
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from "../../components/Pdf/Pdf"

const ProjectDetail = ({project, projectsEntries, totalHours, totalTravels, start, end, onChange}) => {
  console.log(start)
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
            {label: "Muistiinpanot", value: project.memo ? project.memo : "Ei muistiinpanoja"}
          ]}
        />
        </Card>
      </div>
      <div className="project-detail hours">
        <Card
          title='Projektin tunnit & hinta'
          icon='⌚️'
        >
          {!end && (
            <small className="range-info">valitse aikaväli luodaksesi PDF</small>
          )}
          <div className="project-range-pdf">
            <ProjectHours start={start} end={end} onChange={onChange} />
            { start && end && (
              <PDFDownloadLink document={<Pdf project={project} projectsEntries={projectsEntries} start={start.toLocaleDateString()} end={end.toLocaleDateString()} />} fileName="testi.pdf">
                {({ blob, url, loading, error }) =>
                  loading ? 'Ladataan...' : 'Luo PDF'
                }
              </PDFDownloadLink>
            )}
          </div>
          <CardSection
            fields={[
              {label: start && end ? `Aikavälin ${start.toLocaleDateString('fi-Fi', {day: 'numeric', month: 'numeric'})} - ${end.toLocaleDateString('fi-Fi', {day: 'numeric', month: 'numeric'})} yhteenveto` : "Kokonaistuntien yhteenveto"},
              {label: "Tehdyt tunnit", value: start && end ? `${totalHours} h` : `${project.hours.toFixed(1)} h`},
              {label: "Alviton hinta (Alv 0)", value: project.hourRate ? `${project.hourRate * (start && end ? totalHours : project.hours).toFixed(2)} €` : project.fixedRate ? `${project.fixedRate} €` : "Ei hintaa" },
              {label: "Alvin määrä (Alv 25,5%)", value: project.hourRate ? `${((project.hourRate * (start && end ? totalHours : project.hours)) * 0.255).toFixed(2)} €` : project.fixedRate ? `${((project.fixedRate) * 0.255).toFixed(2)} €` : "Ei hintaa" },
              {label: "Kokonaishinta", value: project.hourRate ? `${((project.hourRate * (start && end ? totalHours : project.hours)) * 1.255).toFixed(2)} €` : project.fixedRate ? `${((project.fixedRate) * 1.255).toFixed(2)} €` : "Ei hintaa" },
              {label: "Kilometrit yhteensä", value: start && end ? `${totalTravels} km` : `${project.kilometers} km`},
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