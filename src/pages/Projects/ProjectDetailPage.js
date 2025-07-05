import "./Projects.css"
import ProjectDetail from "../../components/Projects/ProjectDetail"
import { useParams } from "react-router-dom"
import useProjectDetail from "../../hooks/useProjectDetail"

const ProjectDetailPage = () => {
  const {id} = useParams()
  const { project } = useProjectDetail(id)

  if (!project) {
    return <div>Ladataan projektia...</div>;
  }
  return (
    <div>
      <h3>Projekti: {project.name}</h3>
      <ProjectDetail project={project}/>
    </div>
  )
}

export default ProjectDetailPage