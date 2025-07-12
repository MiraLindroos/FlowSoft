import './Modal.css'

const Modal = ({message, children, onConfirm, onCancel, cancelButton, confirmButton, width = "65%"}) => {
  return (
    <div className="modal">
      <div className="modal-content" style={{width}}>
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