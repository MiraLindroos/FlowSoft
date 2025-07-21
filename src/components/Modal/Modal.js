import './Modal.css'

const Modal = ({message, children, onConfirm, onCancel, cancelButton, confirmButton, width = "65%"}) => {
  return (
    <div className="modal">
      <div className="modal-content" style={{width}}>
        {/* Display modal message */}
        <p>{message}</p>
        {/* Modal content */}
        {children}
        {/* Modal buttons for cancel and confirm */}
        <div className="modal-buttons">
          <button onClick={onCancel}>{cancelButton}</button>
          <button onClick={onConfirm}>{confirmButton}</button>
        </div>
      </div>
    </div>
  )
}

export default Modal