import ProjectsList from "../../components/Projects/ProjectsList"
import useProjectsList from "../../hooks/useProjectsList"
import "./Projects.css"
import Modal from "../../components/Modal/Modal"
import { useForm, FormProvider } from "react-hook-form"
import useModal from "../../hooks/useModal"
import Form from "../../components/Forms/Form"
import addProjectFields from "../../data/addProjectFields"

const Projects = () => {
  const {
    projects
  } = useProjectsList()

  const {
    showModal,
    modalContent,
    openModal,
    closeModal
  } = useModal()

  const methods = useForm()

  const onSubmit = (data) => console.log(data)

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