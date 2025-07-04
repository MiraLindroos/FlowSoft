import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase/index"

const useAuth = (openModal, closeModal) => {
  const handleLogOut = () => {
    console.log('kklikattu')
    openModal({
      message: "Haluatko kirjautua ulos?",
      onConfirm: () => {
        signOut(auth)
          .then(() => {
            console.log('logattu ulos')
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
          })
      },
      onCancel: closeModal
    })
  }

  return {
    handleLogOut
  }
}

export default useAuth