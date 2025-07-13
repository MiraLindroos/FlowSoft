import Calendar from "../../components/Calendar/Calendar"
import "./TimeManagement.css"
import useDateUtils from "../../hooks/useDateUtils"
import useModal from "../../hooks/useModal"
import Modal from "../../components/Modal/Modal"
import Form from "../../components/Forms/Form"
import useAddHoursForm from "../../hooks/useAddHoursForm"
import { useForm, FormProvider } from "react-hook-form"
import useCalendarTimeEntries from "../../hooks/useCalendarTimeEntries"
import { useState } from "react"

const TimeManagement = () => {
    const {
    currentDate,
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

  const { timeEntries, addTimeEntry } = useCalendarTimeEntries(currentMonth, currentYear)

  const methods = useForm()

  const time = (timeString, date) => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
  }

  const onSubmit = (data, date) => {
    const start = time(data.startTime, date)
    const end = time(data.endTime, date)
    const diffMs = Math.abs(end - start)  // erotus millisekunteina
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))  // kokonaiset tunnit
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))  // jäljellä olevat minuutit

    console.log(diffHours + "h " + diffMinutes + "min")
    // addTimeEntry({...data, startTime: start, endTime: end})
  }

  const handleDayClick = (date) => {
    const formattedDate = date.toLocaleDateString('fi-FI', { weekday: 'short', day: 'numeric', month: 'numeric' })
    openModal({
      message: `Lisää tunteja päivälle ${formattedDate}`,
      children:
      <FormProvider {...methods}>
        <Form fields={addHoursFields}/>
      </FormProvider>,
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
          currentDate={currentDate}
          daysInAMonth={daysInAMonth}
          nextMonth={nextMonth}
          previousMonth={previousMonth}
          onDateClick={handleDayClick}
          timeEntries={timeEntries}
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
    </>

  )
}

export default TimeManagement