const useCalendarEvents = (openModal, closeModal) => {
  const handleDayClick = (day, child) => {
    openModal({
      message: `Lisää tunteja päivälle ${day}.`,
      children: child,
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