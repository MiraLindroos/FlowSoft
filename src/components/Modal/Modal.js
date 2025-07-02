import './Modal.css'

const Modal = ({message, onConfirm, onCancel}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="buttons">
          <button onClick={onCancel}>sulje</button>
          <button onClick={onConfirm}>vahvista</button>
        </div>
      </div>
    </div>
  )
}

export default Modal