import { useState, useEffect } from "react"
import './App.css'
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import AppRoutes from "./AppRoutes"
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login/Login'
import { auth } from "./firebase/index"
import { onAuthStateChanged } from "firebase/auth"
import useModal from "./hooks/useModal"
import useSidebarAndNavbar from "./hooks/useSidebarAndNavbar"
import useAuth from "./hooks/useAuth"
import Modal from "./components/Modal/Modal"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  const { showModal, modalContent, openModal, closeModal } = useModal()
  const { handleLogOut } = useAuth(openModal, closeModal)
  const { isSidebarOpen, setSidebarOpen, isMobile, navbarItems, sidebarVisibleRoutes } = useSidebarAndNavbar(handleLogOut)

  useEffect(() => {
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
    // Unsubscribe from auth changes on component unmount
    return () => {
      unsubscribe()
    }
  }, [])

  if (!authChecked) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div className="App">
      {/* If user has not logged in, show login page */}
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/Kirjaudu" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <>
          <Navbar
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
            onLogOutClick={handleLogOut}
            items={navbarItems}
          />
          <div className="main-content-area">
            {/* If isSidebarOpen is true, show the sidebar */}
            {isSidebarOpen &&
              <Sidebar
                setSidebarOpen={setSidebarOpen}
                isMobile={isMobile}
                onLogOutClick={handleLogOut}
                visibleRoutes={sidebarVisibleRoutes}
              />
            }
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
