import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase/index"
import { useState, useEffect } from "react"

// Custom hook to handle authentication state and logout logic
const useAuth = (openModal, closeModal) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authChecked, setAuthChecked] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Subscribe to Firebase auth state changes to track user login status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, setCurrentUser to user.uid
        setCurrentUser(user.uid)
        // setIsLoggedIn to true
        setIsLoggedIn(true)
      } else {
        // User is signed out, set isLoggedIn to false
        setIsLoggedIn(false)
      }
      // Mark that auth state has been checked
      setAuthChecked(true)
    });
    // Unsubscribe from auth changes on component unmount
    return () => {
      unsubscribe()
    }
  }, [])

  // Function to handle logout with confirmation modal
  const handleLogOut = () => {
    openModal({
      message: "Haluatko kirjautua ulos?",
      onConfirm: () => {
        // If user confirms, sign out from Firebase
        signOut(auth)
          .then(() => {
            // Close modal after successful logout
            closeModal()
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
          })
      },
      onCancel: closeModal, // Close modal if user cancels
      cancelButton: "Ei",
      confirmButton: "Kyllä",
      width: "270px"
    })
  }

  return {
    isLoggedIn,
    setIsLoggedIn,
    authChecked,
    currentUser,
    handleLogOut
  }
}

export default useAuth