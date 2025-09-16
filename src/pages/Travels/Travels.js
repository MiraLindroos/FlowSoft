import List from "../../components/List/List"
import useTravels from "../../hooks/useTravels"
import Button from "../../components/Button/Button"
import "./Travels.css"
import useModal from "../../hooks/useModal"
import Modal from "../../components/Modal/Modal"
import Form from "../../components/Forms/Form"
import { useForm, FormProvider } from "react-hook-form"
import useAddTravelsForm from "../../hooks/useAddTravelsForm"
import { Toaster } from "react-hot-toast"
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from "../../components/Pdf/Pdf"
import DateRange from "../../components/DateRange/DateRange"
import { useState } from "react"
import useDateUtils from "../../hooks/useDateUtils"

const Travels = () => {
  const [start, setStartDate] = useState(new Date())
  const [end, setEndDate] = useState()
  const { travels, addTravel, deleteTravel, incremetProjectKm } = useTravels()

  const { addTravelFields } = useAddTravelsForm()

  const {
    showModal,
    modalContent,
    openModal,
    closeModal
  } = useModal()

  const { normalizeDateRange } = useDateUtils()

  const methods = useForm()

  const onSubmit = (data) => {
    data.date = new Date(data.date)
    // The selected project is a JSON string so we need to parse it
    const selectedProject = JSON.parse(data.project)
    // Replace data.project to hold the project's name
    data.project = selectedProject.name
    // Store the project's ID
    data.projectId = selectedProject.id
    incremetProjectKm(data.projectId, data.kilometers)
    addTravel(data)
    closeModal()
  }

  const onDelete = (travel) => {
    openModal({
      message: `Haluatko varmasti poistaa matkan: ${travel.name}?`,
      onConfirm: () => {
        deleteTravel(travel)
        closeModal()
      },
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Vahvista",
      width: "85%"
    })
  }

  const addTravelClick = () => {
    methods.reset({})
    openModal({
      message: "Lisää uusi matka",
      children:
      <FormProvider {...methods}>
        <Form fields={addTravelFields}/>
      </FormProvider>,
      onConfirm: methods.handleSubmit(onSubmit),
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Tallenna",
      width: "85%"
    })
  }

  const onDateChange = (dates) => {
    const {start, end} = normalizeDateRange(dates)
    setStartDate(start);
    setEndDate(end);
    console.log(start, end)
  };

  return (
    <div className="travels-view">
      <h3>Matkakulut (ei vielä täysin toiminnassa)</h3>
      <div className="travel-buttons">
        <Button title={'LISÄÄ UUSI'} onClick={addTravelClick} />
        <DateRange start={start} end={end} onChange={onDateChange}/>
        {/* <PDFDownloadLink
          document={
            <Pdf

            />
          }
          fileName={`testi-matka.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Ladataan...' : 'Luo PDF'
          }
        </PDFDownloadLink> */}
      </div>
      <div className="travels-list">
        <List onDelete={onDelete} items={travels} path={'Matka'} />
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

export default Travels