import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase/index"
import { useState, useEffect } from "react"

const useAuth = (openModal, closeModal) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authChecked, setAuthChecked] = useState(null)

  useEffect(() => {
    // Subscribe to Firebase auth state changes to track user login status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, setIsLogged in to true
        const uid = user.uid
        console.log(uid)
        setIsLoggedIn(true)
      } else {
        // User is signed out, set isLoggedIn to false
        setIsLoggedIn(false)
      }
      setAuthChecked(true)
    });
    // Unsubscribe from auth changes on component unmount
    return () => {
      unsubscribe()
    }
  }, [])

  const handleLogOut = () => {
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
    isLoggedIn,
    setIsLoggedIn,
    authChecked,
    handleLogOut
  }
}

export default useAuth