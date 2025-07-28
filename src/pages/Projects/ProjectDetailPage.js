import "./Projects.css"
import ProjectDetail from "../../components/Projects/ProjectDetail"
import { useParams, useNavigate } from "react-router-dom"
import useProjectDetail from "../../hooks/useProjectDetail"
import Modal from "../../components/Modal/Modal"
import { useForm, FormProvider } from "react-hook-form"
import useModal from "../../hooks/useModal"
import Form from "../../components/Forms/Form"
import addProjectFields from "../../data/addProjectFields"
import useProjects from "../../hooks/useProjects"
import Button from "../../components/Button/Button"
import { FiArrowLeft } from "react-icons/fi"

const ProjectDetailPage = () => {
  const {id} = useParams()
  const { project } = useProjectDetail(id)
  const navigate = useNavigate()

  const {
    showModal,
    modalContent,
    openModal,
    closeModal
  } = useModal()

  const { addProject } = useProjects()

  const methods = useForm()

  const onSubmit = (data) => {
    addProject(data)
    closeModal()
  }
  // Function to convert Date object to 'YYYY-MM-DD' format for input type=date field
  const dateToInputValue = (date) => {
    const year = date.getFullYear()
    // Convert month (0–11) to 1–12, then add a zero in front if needed (e.g. "03")
    const month = String(date.getMonth() + 1).padStart(2, '0') // e.g. month 11 already has two numbers so no zero needed in front
    // Convert day number to string and add a zero in front if needed (e.g. "09")
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const editProjectClick = () => {
    methods.reset({ // Reset methods with projet values
      ...project,
      // Convert Firestore Timestamps to input type=date strings
      startDate: dateToInputValue(project.startDate.toDate()),
      endDate: dateToInputValue(project.endDate.toDate())
    })
    openModal({
      message: `Muokkaa projektia: ${project.name}`,
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

  if (!project) {
    return <div>Ladataan projektia...</div>;
  }
  return (
    <div>
      <button className="go-back" onClick={() => navigate(-1)}><FiArrowLeft /></button>
      <h3 className="project-title">Projekti: {project.name}</h3>
      <Button title={'Muokkaa'} onClick={editProjectClick} />
      <ProjectDetail
        project={project}
      />
      {showModal && (
        <Modal
          message={modalContent.message}
          children={modalContent.children}
          onConfirm={modalContent.onConfirm}
          onCancel={modalContent.onCancel}
          cancelButton={modalContent.cancelButton}
          confirmButton={modalContent.confirmButton}
          width={modalContent.width}
        />
      )}
    </div>
  )
}

export default ProjectDetailPage