import Calendar from "../../components/Calendar/Calendar"
import "./TimeManagement.css"
import useDateUtils from "../../hooks/useDateUtils"
import useModal from "../../hooks/useModal"
import Modal from "../../components/Modal/Modal"
import Form from "../../components/Forms/Form"
import useAddHoursForm from "../../hooks/useAddHoursForm"
import { useForm, FormProvider } from "react-hook-form"
import useCalendarTimeEntries from "../../hooks/useCalendarTimeEntries"
import { Toaster } from "react-hot-toast"
import Button from "../../components/Button/Button"

const TimeManagement = () => {

  const {
    currentMonth,
    currentYear,
    daysInAMonth,
    nextMonth,
    previousMonth,
  } = useDateUtils()

  const {
    showModal,
    modalContent,
    openModal,
    closeModal,
  } = useModal()

  const { addHoursFields } = useAddHoursForm()

  const { addTimeEntry, deleteTimeEntry } = useCalendarTimeEntries(currentMonth, currentYear)

  const methods = useForm()

  const time = (timeString, date) => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
  }

  const onSubmit = (data, date) => {
    const start = time(data.startTime, date)
    const end = time(data.endTime, date)
    // Counting hours between startTime and endTime, abs returns the absolute positive value
    const diffMs = Math.abs(end - start) // This value is in milliseconds
    // Counting hours, there are (1000 * 60 * 60) millisecond in an hour
    const totalHours = (diffMs / (1000 * 60 * 60)).toFixed(2) // Rounding up to two decimals

    // The selected project is a JSON string so we need to parse it
    const selectedProject = JSON.parse(data.project)
    // Replace data.project to hold the project's name
    data.project = selectedProject.name
    // Store the project's ID
    data.projectId = selectedProject.id

    addTimeEntry({
      ...data,
      startTime: start,
      endTime: end,
      hours: totalHours,
    })
    closeModal()
  }

  const handleDayClick = (date) => {
    const formattedDate = date.toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric' })
    methods.reset({  // Reset methods before adding a new entry
      startTime: "",
      endTime: "",
      project: "",
      travel: "",
      hourRate: "",
      memo: ""
    })
    openModal({
      message: `Lisää tunteja päivälle ${formattedDate}`,
      children:
      <FormProvider {...methods}>
        <Form fields={addHoursFields} />
      </FormProvider>,
      onConfirm: methods.handleSubmit((data) => onSubmit(data, date)),
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Tallenna",
      width: "85%"
    })
  }


  const onDelete = (entry) => {
    openModal({
      message: `Haluatko varmasti poistaa tuntilisäyksen projektille ${entry.project}?`,
      onConfirm: () => {
        deleteTimeEntry(entry.id)
        closeModal()
      },
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Vahvista",
      width: "85%"
    })
  }

  const handleEntryClick = (date, entry) => {
    const formattedDate = date.toLocaleDateString('fi-FI', { day: 'numeric', month: 'numeric' })
    methods.reset({ // Reset methods with entry values
      ...entry,
      startTime: entry.startTime.toDate().toTimeString().slice(0, 5),
      endTime: entry.endTime.toDate().toTimeString().slice(0, 5)
    })
    openModal({
      message: `Muokkaa tunteja päivälle ${formattedDate} (Projekti: ${entry.project})`,
      children:
      <>
        <Button title={'Poista'} onClick={() => onDelete(entry)} />
        <FormProvider {...methods}>
          <Form fields={addHoursFields} />
        </FormProvider>
      </>,
      onConfirm: methods.handleSubmit((data) => onSubmit(data, date)),
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Tallenna",
      width: "85%"
    })
  }

  return (
    <>
      <h3>Ajanhallinta</h3>
      <div className="timemanagement">
        <Calendar
          daysInAMonth={daysInAMonth}
          nextMonth={nextMonth}
          previousMonth={previousMonth}
          onDateClick={handleDayClick}
          onEntryClick={handleEntryClick}
        />
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
      <Toaster />
    </>

  )
}

export default TimeManagement