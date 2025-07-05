import "./Projects.css"
import ProjectDetail from "../../components/Projects/ProjectDetail"
import { useParams } from "react-router-dom"

const ProjectDetailPage = () => {
  const {id} = useParams()
  console.log(id)
  return (
    <ProjectDetail />
  )
}

export default ProjectDetailPage