import "./Projects.css"
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi"

const ProjectsList = ({projects}) => {

  return (
    <div className="projects-list">
      {projects.map((project, index) => (
        <div className="project-row">
          <Link key={index} className="project-item">{project.name}</Link>
          <button className="edit"><FiEdit /></button>
        </div>
      ))}
    </div>
  )
}

export default ProjectsList;