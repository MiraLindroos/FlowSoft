import "./Projects.css"

const ProjectInfo = ({project}) => {
  return (
    <div className="project-info">
      <p className="info-p">Projekti: {project.name}</p>
      <p>Kesto: {project.endDate.toDate().toDateString()}</p>
      <p>Lisätty: {project.created.toDate().toDateString()}</p>
      <p>Hinta: {project.price}</p>
    </div>
  )
}

export default ProjectInfo