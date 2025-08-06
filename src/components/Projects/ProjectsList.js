import "./Projects.css"
import { Link } from "react-router-dom"
import { FiTrash } from "react-icons/fi"
import { useAtomValue } from "jotai"
import { projectsAtom } from "../../jotai/atoms"

const ProjectsList = ({onDelete}) => {
  const projects = useAtomValue(projectsAtom)
  return (
    <>
      {projects.length > 0 ? (
        <div className="projects-list">
          {projects.map((project) => (
            <div className="project-row" key={project.id}>
              <Link to={`/Projekti/${project.id}`} className="project-item">{project.name}</Link>
              <button className="edit" onClick={() => onDelete(project)}><FiTrash /></button>
            </div>
          ))}
        </div>
        ) : <p>Ei projekteja</p>
      }
    </>
  )
}

export default ProjectsList