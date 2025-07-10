import './Modal.css'

const Modal = ({message, children, onConfirm, onCancel, cancelButton, confirmButton}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        {children}
        <div className="modal-buttons">
          <button onClick={onCancel}>{cancelButton}</button>
          <button onClick={onConfirm}>{confirmButton}</button>
        </div>
      </div>
    </div>
  )
}

export default Modal