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
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react"
import useDateUtils from "../../hooks/useDateUtils"

const ProjectDetailPage = () => {
  // Dates for date range picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();

  const {id} = useParams()
  const { project, projectsEntries, fetchProjectHours, totalHours, totalKilometers } = useProjectDetail(id)
  const navigate = useNavigate()


  const {
    showModal,
    modalContent,
    openModal,
    closeModal
  } = useModal()

  const { addProject } = useProjects()

  const methods = useForm()

  const { dateToInputValue } = useDateUtils()

  const onSubmit = (data) => {
    const today = new Date()
    const start = data.startDate ? new Date(data.startDate) : null
    const end = data.endDate ? new Date(data.endDate) : null

    let onGoing

    if (start && end) {
        // If both dates are given, define onGoing based on the dates
        onGoing = (start <= today && today <= end)
      } else {
        // Else use the value given by the checkbox
        onGoing = data.onGoing
    }

    addProject({...data, onGoing: onGoing})
    closeModal()
  }

  const editProjectClick = () => {
    methods.reset({ // Reset methods with projet values
      ...project,
      // Convert Firestore Timestamps to input type=date strings
      startDate: project.startDate ? dateToInputValue(project.startDate.toDate()) : null,
      endDate: project.endDate ? dateToInputValue(project.endDate.toDate()) : null
    })
    openModal({
      message: `Muokkaa projektia: ${project.name}`,
      children:
      <FormProvider {...methods}>
        <Form fields={addProjectFields} />
      </FormProvider>,
      onConfirm: methods.handleSubmit(onSubmit),
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Tallenna",
      width: "85%"
    })
  }

  if (!project) {
    return <div className="loading">Ladataan projektia...</div>;
  }

  const onDateChange = (dates) => {
    const [start, end] = dates;
    if (start) {
      start.setHours(0, 0, 0, 0)
    }
    if (end) {
      end.setHours(23, 59, 59, 999)
    }
    setStartDate(start);
    setEndDate(end);
    fetchProjectHours(start, end)
  };

  return (
    <div>
      <button className="go-back" onClick={() => navigate(-1)}><FiArrowLeft /></button>
      <h3 className="project-title">Projekti: {project.name}</h3>
      <Button title={'Muokkaa'} onClick={editProjectClick} />
      <ProjectDetail
        project={project} projectsEntries={projectsEntries} totalHours={totalHours} totalTravels={totalKilometers} start={startDate} end={endDate} onChange={onDateChange}
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