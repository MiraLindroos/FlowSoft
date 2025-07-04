import { useState } from "react"

const useModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({
    message: "",
    onConfirm: () => {},
    onCancel: () => {}
  })

  const openModal = ({message, onConfirm, onCancel}) => {
    console.log('open')
    setModalContent({message, onConfirm, onCancel})
    setShowModal(true)
    console.log(showModal)
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