import { useState } from "react"

const useModal = () => {
  // State to track if modal is visible
  const [showModal, setShowModal] = useState(false)
  // State for modal content and configuration
  const [modalContent, setModalContent] = useState({
    message: "", // Modal message text
    children: null, // Optional React element to render inside modal
    onConfirm: () => {}, // Function to call when user confirms
    onCancel: () => {}, // Function to call when user cancels
    cancelButton: "", // Cancel button label
    confirmButton: "", // Confirm button label
    width: "65%", // Modal width
  })

  // Function to open modal with given content and config
  const openModal = ({message, children, onConfirm, onCancel, cancelButton, confirmButton, width}) => {
    setModalContent({message, children, onConfirm, onCancel, cancelButton, confirmButton, width})
    setShowModal(true)
  }

  // Function to close modal
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