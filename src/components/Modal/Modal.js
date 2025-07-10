import './Modal.css'

const Modal = ({message, onConfirm, onCancel, cancelButton, confirmButton}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onCancel}>{cancelButton}</button>
          <button onClick={onConfirm}>{confirmButton}</button>
        </div>
      </div>
    </div>
  )
}

export default Modal