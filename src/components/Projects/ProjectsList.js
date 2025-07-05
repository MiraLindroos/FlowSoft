import "./Projects.css"
import { Link } from "react-router-dom"
import { FiEdit } from "react-icons/fi"

const ProjectsList = ({projects}) => {

  return (
    <div className="projects-list">
      {projects.map((project) => (
        <div className="project-row" key={project.id}>
          <Link to={`/Projekti/${project.id}`} className="project-item">{project.name}</Link>
          <button className="edit"><FiEdit /></button>
        </div>
      ))}
    </div>
  )
}

export default ProjectsList