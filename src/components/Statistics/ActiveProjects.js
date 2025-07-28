import "./Statistics.css";
import useProjects from "../../hooks/useProjects"

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
            <li key={index}>
              {project.name} - {project.value}h
            </li>
          ))}
        </ul>
      )}

    </>
  )
}

export default ActiveProjects;