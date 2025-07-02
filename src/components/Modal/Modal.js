const Modal = ({message, onConfirm, onCancel}) => {
  return (
    <div className="modal">
      <p>{message}</p>
      <button onClick={onCancel}>sulje</button>
      <button onClick={onConfirm}>vahvista</button>
    </div>
  )
}

export default Modal