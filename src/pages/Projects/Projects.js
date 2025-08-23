import List from "../../components/List/List"
import useProjects from "../../hooks/useProjects"
import "./Projects.css"
import Modal from "../../components/Modal/Modal"
import { useForm, FormProvider } from "react-hook-form"
import useModal from "../../hooks/useModal"
import Form from "../../components/Forms/Form"
import addProjectFields from "../../data/addProjectFields"
import toast, { Toaster } from "react-hot-toast"
import Button from "../../components/Button/Button"
import { useAtomValue } from "jotai"
import { projectsAtom } from "../../jotai/atoms"

const Projects = () => {
  const projects = useAtomValue(projectsAtom)

  const {
    addProject,
    deleteProject
  } = useProjects()

  const {
    showModal,
    modalContent,
    openModal,
    closeModal
  } = useModal()

  const methods = useForm() // useForm is a custom hook for managing form state and validation

  const onSubmit = (data) => {
    // If user has given both start date and end date, check that end date isn't before start date
    // If end is before start, show toast message
    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      toast.error("Lopetuspäivä ei voi olla aloituspäivää ennen", {duration: 5000})
    // If everything is okay, let's add the project to firestore
    } else {
      addProject(data)
      closeModal()
    }
  }

  const addProjectClick = () => {
    methods.reset({}) // Reset form before opening
    openModal({
      message: "Lisää uusi projekti",
      children:
      // We need to wrap the form with FormProvide for useFormContext (which is used in the Form component) to work properly
      // Pass all methods into the context
      <FormProvider {...methods}> 
        <Form fields={addProjectFields}/>
      </FormProvider>,
      onConfirm: methods.handleSubmit(onSubmit), // Triggered when user clicks 'save'
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Tallenna",
      width: "85%"
    })
  }

  // Function for opening confirmation modal for deleting a project
  const onDelete = (project) => {
    openModal({
      message: `Haluatko varmasti poistaa projektin: ${project.name}?`,
      onConfirm: () => {
        deleteProject(project.id) // If user confirms, delete the project
        closeModal()
      },
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Vahvista",
      width: "85%"
    })
  }

  return (
    <div className="projects-view">
      <h3>Projektit</h3>
      <div className="project-buttons">
        <Button title={'LISÄÄ UUSI'} onClick={addProjectClick} />
      </div>
      <div className="projects-list">
        <List onDelete={onDelete} items={projects} path={'Projekti'} />
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
      <Toaster />
    </div>
  )
}

export default Projects