import ProjectsList from "../../components/Projects/ProjectsList"
import useProjectsList from "../../hooks/useProjectsList"
import "./Projects.css"
import ProjectCard from "../../components/Projects/ProjectCard"

const Projects = () => {
  const {
    projects
  } = useProjectsList()
  return (
    // <div className="projects-view">
    //   <div className="project-buttons">
    //     <button className="add-project">LISÄÄ UUSI</button>
    //   </div>
    //   <div className="projects-list">
    //     <ProjectsList projects={projects}/>
    //   </div>
    // </div>
    <ProjectCard />
  )
}

export default Projects