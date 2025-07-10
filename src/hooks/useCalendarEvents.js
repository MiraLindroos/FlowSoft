const useCalendarEvents = (openModal, closeModal) => {
  const handleDayClick = () => {
    openModal({
      message: "Lisää tunteja",
      onConfirm: () => {
        console.log("tallennettu")
      },
      onCancel: closeModal,
      cancelButton: "Peruuta",
      confirmButton: "Tallenna"
    })
  }

  return {
    handleDayClick
  }
}

export default useCalendarEvents