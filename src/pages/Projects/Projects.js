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

  const methods = useForm()

  const onSubmit = (data) => {
    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      toast.error("Lopetuspäivä ei voi olla aloituspäivää ennen", {duration: 5000})
    } else {
      addProject(data)
      closeModal()
    }
  }

  const addProjectClick = () => {
    methods.reset({})
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

  const onDelete = (project) => {
    openModal({
      message: `Haluatko varmasti poistaa projektin: ${project.name}?`,
      onConfirm: () => {
        deleteProject(project.id)
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