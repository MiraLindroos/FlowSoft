import Card from "../Card/Card"
import ProjectInfo from "./ProjectInfo"
import "./Projects.css"

const ProjectDetail = ({project}) => {
  return (
    <div className="project-detail">
      <div className="project-detail info">
        <Card
          title='projektin tiedot'
        > <ProjectInfo project={project}/>
        </Card>
      </div>
      <div className="project-detail hours">
        <Card
          title='projektin tunnit'
          description='tunnit'
        > <ProjectInfo project={project}/>
        </Card>
      </div>
      <div className="project-detail else">
        <Card
          title='projektin muuta'
          description='jotain'
        > <ProjectInfo project={project}/>
        </Card>
      </div>
    </div>
  )
}

export default ProjectDetail