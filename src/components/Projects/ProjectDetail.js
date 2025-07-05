import Card from "../Card/Card"
import ProjectInfo from "./ProjectInfo"

const ProjectDetail = ({project}) => {
  return (
    <div>
      <Card
        title='projektin tiedot'
      > <ProjectInfo project={project}/>
      </Card>
      <Card
        title='projektin tunnit'
        description='infoo'
      />
      <Card
        title='projektin muuta'
        description='infoo'
      />
    </div>
  )
}

export default ProjectDetail