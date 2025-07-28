import "./Statistics.css";
import useProjects from "../../hooks/useProjects"

const ActiveProjects = () => {
  const { activeProjects } = useProjects()

  return (
    <>
      <ul className="active-projects">
        {activeProjects.map((project, index) => (
          <li key={index}>
            {project.name} - {project.value}h
          </li>
        ))}
      </ul>
      {activeProjects.length === 0 && (
        <div className="no-active-projects">
          <p>Ei aktiivisia projekteja!</p>
        </div>

      )}
    </>
  )
}

export default ActiveProjects;