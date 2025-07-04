import Card from "../Card/Card"
import ProjectInfo from "./ProjectInfo"

const ProjectCard = () => {
  return (
    <div>
      <Card
        title='projektin tiedot'
        description='infoo'
      > <ProjectInfo />
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

export default ProjectCard