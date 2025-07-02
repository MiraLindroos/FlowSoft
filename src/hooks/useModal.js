import { useState } from "react"

const useModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({
    message: "",
    onConfirm: () => {},
    onCancel: () => {}
  })

  const openModal = ({message, onConfirm, onCancel}) => {
    setModalContent({message, onConfirm, onCancel})
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