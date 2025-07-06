import Card from "../Card/Card"
import CardSection from "../Card/CardSection"
import "./Projects.css"

const ProjectDetail = ({project}) => {
  return (
    <div className="project-detail">
      <div className="project-detail info">
        <Card
          title='projektin tiedot'
        > <CardSection
          fields={[
            {label: "Projekti", value: project.name},
            {label: "Kesto", value: project.endDate.toDate().toDateString()},
            {label: "Lisätty", value: project.created.toDate().toDateString()},
            {label: "Hinta", value: project.price}
          ]}
        />
        </Card>
      </div>
      <div className="project-detail hours">
        <Card
          title='projektin tunnit'
          description='tunnit'
        > <CardSection
            fields={[
              {label: "Tunnit tässä kuussa", value: "20"},
              {label: "tunnit yhteensä", value: "90"},
            ]}
          />
        </Card>
      </div>
      <div className="project-detail else">
        <Card
          title='projektin muuta'
          description='jotain'
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