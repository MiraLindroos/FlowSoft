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
import useTravels from "../../hooks/useTravels"

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

  const { saveTimeEntry, deleteTimeEntry, decrementHoursKm, incremetHoursKm } = useCalendarTimeEntries(currentMonth, currentYear)

  const { addTravel } = useTravels()

  const methods = useForm()

  const time = (timeString, date) => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
  }

  const onSubmit = (data, date, originalEntry) => {
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

    // If editing an existing time entry
    if (data.id) {
      // Calculating if hours or kilometers have changed from original values
      const hoursDiff = totalHours - originalEntry.hours
      const kmDiff = data.kilometers - originalEntry.kilometers
      // Checking if project has been changed for the entry
      const projectChanged = originalEntry.projectId !== data.projectId

      // If project has been changed for the entry
      if (projectChanged) {
        // We have to decrement the hours and kilometers from the original given project
        decrementHoursKm(originalEntry.projectId, originalEntry.hours, originalEntry.kilometers)
        // Then we have to add to the current selected project the entry's totalHours and kilometers
        incremetHoursKm(data.projectId, totalHours, data.kilometers)
        // If project hasn't changed but the hours or the kilometers have
      } else if (hoursDiff !== 0 || kmDiff !== 0) {
        // Let's increment the selected project's hours or kilometers with the difference
        incremetHoursKm(data.projectId, hoursDiff, kmDiff)
      }
      // Update the entry data with the current data
      saveTimeEntry({
        ...data,
        startTime: start,
        endTime: end,
        hours: totalHours,
      })
      // If entry doesn't have id yet, we will create a new document for the entry
    } else {
      saveTimeEntry({
        ...data,
        startTime: start,
        endTime: end,
        hours: totalHours,
      })
      // Increment the selected project's hours and kilometers
      incremetHoursKm(data.projectId, totalHours, data.kilometers)
    }

    // If user enters kilometers for the entry, let's create a document for the kilometers as well
    if (data.kilometers) {
      addTravel({
        ...data,
        date: start
      })
    }
    // At the end of it all let's close the modal
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
        deleteTimeEntry(entry)
        closeModal()
      },
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Vahvista",
      width: "85%"
    })


  }

  const handleEntryClick = (date, entry) => {
    // Find the project field from the form addHoursFields array
    const projectField = addHoursFields.find(f => f.name === "project")
    // Find the project option by matching the name to the entry.project
    // This is needed because the select form expects a JSON string of the whole project object as its value
    const selectedProject = projectField.options.find(option => option.name === entry.project)

    const formattedDate = date.toLocaleDateString('fi-FI', { day: 'numeric', month: 'numeric' })

    methods.reset({ // Reset methods with entry values
      ...entry,
      startTime: entry.startTime.toDate().toTimeString().slice(0, 5),
      endTime: entry.endTime.toDate().toTimeString().slice(0, 5),
      project: JSON.stringify(selectedProject),
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
      onConfirm: methods.handleSubmit((data) => onSubmit(data, date, entry)),
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