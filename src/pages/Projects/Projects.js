import ProjectsList from "../../components/Projects/ProjectsList"
import useProjects from "../../hooks/useProjects"
import "./Projects.css"
import Modal from "../../components/Modal/Modal"
import { useForm, FormProvider } from "react-hook-form"
import useModal from "../../hooks/useModal"
import Form from "../../components/Forms/Form"
import addProjectFields from "../../data/addProjectFields"

const Projects = ({currentUser}) => {
  const {
    projects,
    addProject
  } = useProjects(currentUser)

  const {
    showModal,
    modalContent,
    openModal,
    closeModal
  } = useModal()

  const methods = useForm()

  const onSubmit = (data) => {
    addProject(data)
    closeModal()
  }

    const addProjectClick = () => {
      openModal({
        message: "Lisää uusi projekti",
        children:
        <FormProvider {...methods}>
          <Form fields={addProjectFields}/>
        </FormProvider>,
        onConfirm: methods.handleSubmit(onSubmit),
        onCancel: closeModal,
        cancelButton: "Peruuta",
        confirmButton: "Tallenna",
        width: "85%"
      })
    }

  return (
    <div className="projects-view">
      <h3>Projektit</h3>
      <div className="project-buttons">
        <button className="add-project" onClick={addProjectClick}>LISÄÄ UUSI</button>
      </div>
      <div className="projects-list">
        <ProjectsList projects={projects}/>
      </div>
      {showModal &&
        <Modal
          message={modalContent.message}
          children={modalContent.children}
          onConfirm={modalContent.onConfirm}
          onCancel={modalContent.onCancel}
          cancelButton={modalContent.cancelButton}
          confirmButton={modalContent.confirmButton}
          width={modalContent.width}
        />
      }
    </div>
  )
}

export default Projects