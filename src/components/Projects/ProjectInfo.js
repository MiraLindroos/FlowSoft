const ProjectInfo = ({project}) => {
  return (
    <div style={{textAlign: 'left', margin: ' 0 5px'}}>
      <p style={{margin: '0'}}>Projekti: {project.name}</p>
      <p>Kesto: {project.endDate.toDate().toDateString()}</p>
      <p>Lisätty: {project.created.toDate().toDateString()}</p>
      <p>Hinta: {project.price}</p>
    </div>
  )
}

export default ProjectInfo