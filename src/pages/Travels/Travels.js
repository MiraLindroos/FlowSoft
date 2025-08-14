import List from "../../components/List/List"
import useTravels from "../../hooks/useTravels"
import Button from "../../components/Button/Button"
import "./Travels.css"
import useModal from "../../hooks/useModal"
import Modal from "../../components/Modal/Modal"
import Form from "../../components/Forms/Form"
import { useForm, FormProvider } from "react-hook-form"
import addTravelFields from "../../data/addTravelFields"

const Travels = () => {
  const { travels, addTravel, deleteTravel } = useTravels()

  const {
    showModal,
    modalContent,
    openModal,
    closeModal
  } = useModal()

  const methods = useForm()

  const onSubmit = (data) => {
    addTravel(data)
    closeModal()
  }

  const onDelete = (travel) => {
    openModal({
      message: `Haluatko varmasti poistaa matkan: ${travel.name}?`,
      onConfirm: () => {
        deleteTravel(travel.id)
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

  return (
<div className="travels-view">
      <h3>Matkakulut (ei vielä täysin toiminnassa)</h3>
      <div className="travel-buttons">
        <Button title={'LISÄÄ UUSI'} onClick={addTravelClick} />
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
    </div>
  )
}

export default Travels