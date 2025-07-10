import { useState } from "react"

const useModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
    cancelButton: "",
    confirmButton: "",
  })

  const openModal = ({message, onConfirm, onCancel, cancelButton, confirmButton}) => {
    setModalContent({message, onConfirm, onCancel, cancelButton, confirmButton})
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return {
    showModal,
    modalContent,
    openModal,
    closeModal
  }
}

export default useModal