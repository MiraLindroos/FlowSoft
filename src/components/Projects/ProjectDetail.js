import Card from "../Card/Card"
import ProjectInfo from "./ProjectInfo"
import "./Projects.css"

const ProjectDetail = ({project}) => {
  return (
    <div className="project-detail">
      <div className="project-detail info">
        <Card
          title='projektin tiedot'
          style={{ backgroundColor: "#e0f0f3", borderLeft: "4px solid #013746"}}
        > <ProjectInfo project={project}/>
        </Card>
      </div>
      <div className="project-detail hours">
        <Card
          title='projektin tunnit'
          description='tunnit'
          style={{ backgroundColor: "#e0f3e6", borderLeft: "4px solid #014639"}}
        > <ProjectInfo project={project}/>
        </Card>
      </div>
      <div className="project-detail else">
        <Card
          title='projektin muuta'
          description='jotain'
          style={{ backgroundColor: "#e8e0f3", borderLeft: "4px solid #1a0146"}}
        > <ProjectInfo project={project}/>
        </Card>
      </div>
    </div>
  )
}

export default ProjectDetail