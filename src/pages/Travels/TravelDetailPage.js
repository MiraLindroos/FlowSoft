import TravelDetail from "../../components/Travels/TravelDetail"
import Button from "../../components/Button/Button"
import { FiArrowLeft } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"
import useTravelDetail from "../../hooks/useTravelDetail"
import Form from "../../components/Forms/Form"
import Modal from "../../components/Modal/Modal"
import { useForm, FormProvider } from "react-hook-form"
import useModal from "../../hooks/useModal"
import useAddTravelsForm from "../../hooks/useAddTravelsForm"
import useTravels from "../../hooks/useTravels"
import useDateUtils from "../../hooks/useDateUtils"

const TravelDetailPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const { travel } = useTravelDetail(id)
  const { addTravelFields } = useAddTravelsForm()

  const {
    showModal,
    modalContent,
    openModal,
    closeModal
  } = useModal()

  const methods = useForm()

  const { addTravel, incremetProjectKm } = useTravels()

  const { dateToInputValue } = useDateUtils()

  const onSubmit = (data, travel) => {
    // The selected project is a JSON string so we need to parse it
    const selectedProject = JSON.parse(data.project)
    // Replace data.project to hold the project's name
    data.project = selectedProject.name
    // Store the project's ID
    data.projectId = selectedProject.id
    // Check if kilometers have changed from original value (travel.kilometers)
    const kmDiff = data.kilometers - travel.kilometers
    // If kilometers have changed -> update the selected project's kilometer count
    if (kmDiff !== 0) {
      incremetProjectKm(data.projectId, kmDiff)
    }
    addTravel(data)
    closeModal()
  }

  const editTravelClick = () => {
    // Find the project field from the form addTravelFields array
    const projectField = addTravelFields.find(f => f.name === "project")
    // Find the project option by matching the name to the travel.project
    // This is needed because the select form expects a JSON string of the whole project object as its value
    const selectedProject = projectField.options.find(option => option.name === travel.project)

    methods.reset({ // Reset methods with travel values
      ...travel,
      date: travel.date ? dateToInputValue(travel.date.toDate()) : null,
      project: JSON.stringify(selectedProject)
    })
    openModal({
      message: `Muokkaa matkaa: ${travel.name}`,
      children:
      <FormProvider {...methods}>
        <Form fields={addTravelFields} />
      </FormProvider>,
      onConfirm: methods.handleSubmit((data) => onSubmit(data, travel)),
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Tallenna",
      width: "85%"
    })
  }

  return (
    <div>
      <button className="go-back" onClick={() => navigate(-1)}><FiArrowLeft /></button>
      {travel && <h3 className="travel-title">Matka: {travel.name}</h3>}
      <Button title={'Muokkaa'} onClick={editTravelClick} />
      <TravelDetail travel={travel}/>
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

export default TravelDetailPage