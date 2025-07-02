import { useState, useEffect } from "react"
import './App.css'
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import AppRoutes from "./AppRoutes"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login/Login'
import { auth } from "./firebase/index.js"
import { onAuthStateChanged, signOut } from "firebase/auth"
import useModal from "./hooks/useModal"
import Modal from "./components/Modal/Modal"



function App() {
  // If screen width is 898px or wider, set isSidebarOpen to true
  const [isSidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 898)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 898)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  const { showModal, modalContent, openModal, closeModal } = useModal()

  useEffect(() => {
    // Check window width and update sidebar state
    const handleResize = () => {
      // If screen width is 898 or bigger, set isSidebarOpen to true, otherwise it's false
      setSidebarOpen(window.innerWidth >= 898)
      setIsMobile(window.innerWidth < 898)
    }
    // Add a listener to run handleResize whenever the window is resized
    window.addEventListener('resize', handleResize)
    // Call handleResize to set the correct initial state
    handleResize()

    // Subscribe to Firebase auth state changes to track user login status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, setIsLogged in to true
        const uid = user.uid
        setIsLoggedIn(true)
        setAuthChecked(true)
      } else {
        // User is signed out, set isLoggedIn to false
        setIsLoggedIn(false)
        setAuthChecked(true)
      }
    });
    // Remove the resize listener and unsubscribe from auth changes on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
      unsubscribe()
    }
  }, [])

  console.log(isLoggedIn)
  if (!authChecked) {
    return (
      <div>loading...</div>
    )
  }

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
  console.log(modalContent)

  return (
    <div className="App">
      {/* If user has not logged in, show login page */}
      {!isLoggedIn ? (
        <Routes>
          <Route path="/Kirjaudu" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="*" element={<Navigate to="/Kirjaudu" />} />
        </Routes>
      ) : (
        <>
          <Navbar setSidebarOpen={setSidebarOpen} isMobile={isMobile} onLogOutClick={handleLogOut}/>
          <div className="main-content-area">
            {/* If isSidebarOpen is true, show the sidebar */}
            {isSidebarOpen && <Sidebar setSidebarOpen={setSidebarOpen} isMobile={isMobile}/>}
            <main className="page-content">
              <AppRoutes setIsLoggedIn={setIsLoggedIn}/>
              {showModal &&
                <Modal
                  message={modalContent.message}
                  onConfirm={modalContent.onConfirm}
                  onCancel={modalContent.onCancel}
                />
              }
            </main>
          </div>
        </>
      )}
    </div>
  )
}

export default App
