import Calendar from "../../components/Calendar/Calendar"
import "./TimeManagement.css"
import useDateUtils from "../../hooks/useDateUtils"
import useModal from "../../hooks/useModal"
import Modal from "../../components/Modal/Modal"
import AddHoursForm from "../../components/Forms/AddHoursForm"

const TimeManagement = () => {
    const {
    currentDate,
    daysInAMonth,
    nextMonth,
    previousMonth,
  } = useDateUtils();

  const {
    showModal,
    modalContent,
    openModal,
    closeModal,
  } = useModal()

  const handleDayClick = (day) => {
    openModal({
      message: `Lisää tunteja päivälle ${day}.`,
      children: <AddHoursForm />,
      onConfirm: () => {
        console.log("tallennettu")
        closeModal()
      },
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Tallenna"
    })
  }

  return (
    <>
      <h3>Ajanhallinta</h3>
      <div className="timemanagement">
        <Calendar
          currentDate={currentDate}
          daysInAMonth={daysInAMonth}
          nextMonth={nextMonth}
          previousMonth={previousMonth}
          onDateClick={handleDayClick}
        />
        {showModal &&
          <Modal
            message={modalContent.message}
            children={modalContent.children}
            onConfirm={modalContent.onConfirm}
            onCancel={modalContent.onCancel}
            cancelButton={modalContent.cancelButton}
            confirmButton={modalContent.confirmButton}
          />
        }
      </div>
    </>

  )
}

export default TimeManagement