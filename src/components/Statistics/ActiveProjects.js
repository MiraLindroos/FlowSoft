import "./Statistics.css";
import useProjects from "../../hooks/useProjects"
import { Link } from "react-router-dom"

const ActiveProjects = () => {
  const { activeProjects } = useProjects()

  return (
    <>
      {activeProjects.length === 0 && (
        <div className="no-active-projects">
          <p>Ei aktiivisia projekteja!</p>
        </div>
      )}
      {activeProjects.length > 0 && (
        <ul className={activeProjects.length <= 5 ? "active-projects" : "active-projects-over5"}>
          {activeProjects.map((project, index) => (
              <Link key={index} to={`/Projekti/${project.id}`} className="list-item">{project.name} - {project.value}h</Link>
          ))}
        </ul>
      )}

    </>
  )
}

export default ActiveProjects;