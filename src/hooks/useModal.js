import { useState } from "react"

const useModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({
    message: "",
    children: null,
    onConfirm: () => {},
    onCancel: () => {},
    cancelButton: "",
    confirmButton: "",
    width: "65%",
  })

  const openModal = ({message, children, onConfirm, onCancel, cancelButton, confirmButton, width}) => {
    setModalContent({message, children, onConfirm, onCancel, cancelButton, confirmButton, width})
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