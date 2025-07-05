import "./Projects.css"
import ProjectDetail from "../../components/Projects/ProjectDetail"
import { useParams } from "react-router-dom"
import useProjectDetail from "../../hooks/useProjectDetail"

const ProjectDetailPage = () => {
  const {id} = useParams()

  const { project } = useProjectDetail(id)
  console.log(project)
  if (!project) {
    return <div>Ladataan projektia...</div>;
  }
  return (
    <ProjectDetail project={project}/>
  )
}

export default ProjectDetailPage