import Card from "../Card/Card"
import ProjectInfo from "./ProjectInfo"

const ProjectDetail = () => {
  return (
    <div>
      <Card
        title='projektin tiedot'
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

export default ProjectDetail