import "./Projects.css"

const ProjectsList = ({projects}) => {
  console.log(projects)
  return (
    <div className="projects-list">
      {projects.map((project, index) => (
        <p key={index} className="project-item">{project.name}</p>
      ))}
    </div>
  )
}

export default ProjectsList;